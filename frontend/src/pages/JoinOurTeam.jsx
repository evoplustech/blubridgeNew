import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    id: 'startup',
    question: 'Are we a startup?',
    content: (
      <p className="text-base text-gray-700 leading-relaxed pl-1">
        <strong className="text-black">No.</strong> We are a <strong className="text-black">Deep Learning Research Organization,</strong> not a startup.
      </p>
    )
  },
  {
    id: 'funding',
    question: 'Who is funding us?',
    content: (
      <p className="text-base text-gray-700 leading-relaxed pl-1">
        We are entirely <strong className="text-black">self-funded.</strong>
      </p>
    )
  },
  {
    id: 'eligible',
    question: 'Am I eligible to apply?',
    content: (
      <div className="pl-1">
         <p className="text-base text-gray-700 leading-relaxed mb-3">
          Ask yourself the following:
        </p>
        <ul className="list-disc pl-6 text-base text-gray-700 leading-7 space-y-1.5">
          <li>Do I truly understand the depth of <strong>Deep Learning research?</strong></li>
          <li>Am I aware this is a pragmatic, mathematics-driven science, not just a language task?</li>
          <li>Am I ready to work with first principles of Machine Learning, not frameworks alone?</li>
        </ul>
      </div>
    )
  },
  {
    id: 'begin',
    question: 'Where do I begin? What should I study for the interview?',
    content: (
      <ul className="list-disc pl-7 text-base text-gray-700 leading-7 space-y-1.5">
        <li>Begin by appearing for the <strong className="text-black">initial interview rounds.</strong></li>
        <li>If selected, you'll be invited to a <strong className="text-black">second stage</strong> where a strong grasp of Mathematics for Machine Learning is essential.</li>
        <li>You’ll get up to a month to prepare. Final selection is based on a <strong className="text-black">Maths for Deep Learning</strong> test.</li>
      </ul>
    )
  },
  {
    id: 'pay',
    question: 'How is the pay?',
    content: (
      <div className="pl-1">
        <p className="text-base text-gray-700 leading-relaxed mb-3">
          We offer competitive compensation, but ask you to consider:
        </p>
        <ul className="list-disc pl-6 text-base text-gray-700 leading-7 space-y-1.5">
          <li>You'll be working on Deep Learning from first principles — how many organizations offer that?</li>
          <li>We are among the very few in India genuinely building a foundation model, not just hyping it.</li>
          <li>Building from "first principles" is not the same as starting "from scratch."</li>
          <li>
            If you were to study this in a university:
            <ul className="pl-6 mt-2 space-y-1 list-none">
              <li className="text-base">▶ You'd likely go abroad (e.g., the US)</li>
              <li className="text-base">▶ Pay for a Master's degree</li>
              <li className="text-base">▶ Learn theory without real-world application</li>
            </ul>
          </li>
        </ul>
        <div className="flex items-start gap-2 mt-4 text-base text-gray-700 leading-relaxed">
          <span className="text-base flex-shrink-0">💡</span>
          <span>
            <strong className="text-black">If compensation is your main driver,</strong> you will find better-paying jobs. We are seeking <strong className="text-black">like-minded individuals</strong> who value the mission over money.
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'unique',
    question: 'Why is this opportunity unique?',
    content: (
      <ul className="list-disc pl-7 text-base text-gray-700 leading-7 space-y-1.5">
        <li>We offer a <strong className="text-black">rare research environment</strong> focused solely on foundation model development.</li>
        <li>We're assembling a team of <strong className="text-black">passionate, like-minded individuals</strong></li>
        <li>Whether you're a research scholar or a self-taught enthusiast — if you have the fire to understand and build <strong className="text-black">Large Language Models,</strong> you're welcome to apply.</li>
      </ul>
    )
  },
  {
    id: 'not-apply',
    question: 'Who should not apply?',
    content: (
      <ul className="list-disc pl-7 text-base text-gray-700 leading-7 space-y-1.5">
        <li>Those looking for a <strong className="text-black">routine 9-to-5 job</strong></li>
        <li>Anyone who <strong className="text-black">struggled with 12th-grade mathematics</strong></li>
      </ul>
    )
  }
];

const JoinOurTeam = ({ scrollRef }) => {
  useDocumentTitle('Join our Research Team | BluBridge');

  return (
    <div 
      data-testid="join-our-team-page"
      style={{ 
        backgroundColor: '#e8eaf3', 
        paddingTop: '0', 
        paddingBottom: '50px' 
      }}
    >
      <div style={{ 
        maxWidth: '1261px',
        margin: '0 auto', 
        padding: '0 20px'
      }}>
        {/* Research Team Container */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #d4d8e8',
          borderRadius: '12px',
          padding: '40px 50px',
        }}>
          {/* Main Title */}
          <h1 
            ref={scrollRef}
            data-testid="join-team-heading"
            style={{ 
              textAlign: 'center', 
              fontSize: '36px', 
              fontWeight: 'bold', 
              color: '#1A1A1A',
              
              textDecorationThickness: '1px',
              textUnderlineOffset: '4px',
              marginBottom: '10px',
              scrollMarginTop: '150px',
              lineHeight: '1.3',
              paddingTop: '0'
            }}
          >
            Join our Deep Learning Research Team
          </h1>
          
          {/* Subtitle */}
          <h2 
            data-testid="join-team-subheading"
            style={{ 
              textAlign: 'center', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: '#1A1A1A',
              marginBottom: '35px',
              lineHeight: '1.3'
            }}
          >
            What You Need to Know ?
          </h2>

          {/* FAQ Accordion */}
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            data-testid="faq-accordion"
          >
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border-b border-gray-200 last:border-b-0"
                data-testid={`faq-item-${faq.id}`}
              >
                <AccordionTrigger 
                  className="py-5 text-left text-[1.1rem] font-semibold text-gray-900 hover:no-underline hover:text-gray-700 transition-colors duration-200 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-500 [&>svg]:transition-transform [&>svg]:duration-300"
                  data-testid={`faq-trigger-${faq.id}`}
                >
                  <span className="pr-4">{String.fromCharCode(97 + index)}) {faq.question}</span>
                </AccordionTrigger>
                <AccordionContent 
                  className="pb-5 pt-0"
                  data-testid={`faq-content-${faq.id}`}
                >
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default JoinOurTeam;
