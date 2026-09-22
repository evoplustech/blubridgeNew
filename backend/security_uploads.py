"""Bounded file-structure validation; not a substitute for a malware scanner."""
from io import BytesIO
from pathlib import PurePosixPath
import zipfile
import olefile


def validate_document(filename, content):
    ext = PurePosixPath(filename.replace('\\', '/')).suffix.lower()
    if ext == '.docx':
        try:
            with zipfile.ZipFile(BytesIO(content)) as archive:
                entries = archive.infolist()
                names = {entry.filename for entry in entries}
                if len(entries) > 2000 or sum(entry.file_size for entry in entries) > 20 * 1024 * 1024:
                    return False, 'Document expands beyond the permitted size'
                for entry in entries:
                    name = entry.filename.replace('\\', '/')
                    if name.startswith('/') or '..' in PurePosixPath(name).parts or ':' in name or entry.flag_bits & 1:
                        return False, 'Invalid document archive'
                    if 'vbaproject' in name.lower() or '/embeddings/' in name.lower():
                        return False, 'Embedded executable content is not allowed'
                if not {'[Content_Types].xml', 'word/document.xml'} <= names:
                    return False, 'File is not a Word document'
        except (zipfile.BadZipFile, ValueError, OSError):
            return False, 'Invalid document archive'
    elif ext == '.doc':
        try:
            with olefile.OleFileIO(BytesIO(content)) as document:
                if not document.exists('WordDocument') or any(any(part.lower() in ('vba', 'macros', '_vba_project_cur') for part in stream) for stream in document.listdir()):
                    return False, 'Invalid or active Word document'
        except (OSError, ValueError, IOError):
            return False, 'Invalid Word document'
    elif ext == '.pdf':
        if not content.startswith(b'%PDF-') or b'%%EOF' not in content[-4096:]:
            return False, 'Invalid PDF document'
        if any(marker in content for marker in (b'/JavaScript', b'/Launch', b'/EmbeddedFile', b'/RichMedia')):
            return False, 'Active or embedded PDF content is not allowed'
    return True, ''