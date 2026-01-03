import React, { useState, useEffect, useRef } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { Users, FileText, ExternalLink } from 'lucide-react';

const Careers = () => {
    // useDocumentTitle('Papers & Publications | BluBridge');
return (
    <>
    {/* <Helmet> */}
         <title>Careers at Blubridge - Work with Us</title>
    {/* </Helmet> */}
     
    
    <div>
      <a title="Google Analytics Alternative" href="https://clicky.com/101490753"><img style={{display:"none"}} alt="Clicky" src="//static.getclicky.com/media/links/badge.gif" border="0" /></a>
<script async data-id="101490753" src="//static.getclicky.com/js"></script>
    <section className="px-1 sm:px-2 mb-14 py-0 mt-2">
        <div className="max-w-6xl mx-auto">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            </motion.div> */}
            <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold gradient-text mb-4" style={{lineHeight: '1.2'}}>
              {/* Join Us */}
            </h1>
            
            <div className='main-inner bg-[#fffdf7]'>
                <div className="rounded-xl p-8 px-9 shadow-lg border border-gray-200/50 inner-page">
                    <h1 className='font-bold text-3xl text-black mb-2'>Join Us</h1>
                    <div style={{ borderTop: '1px solid #eee', marginBottom: '1em' }}></div>
                    <a href="/joinourteam" class="text-lg font-bold pt-3 text-[#046bd2] underline mb-4 block"><h2>What You Need to Know ?</h2></a>
                    <p className='inner-content'>
                       We have our offices at <a href="https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267d1ab225575:0xe0b23cd509229297!8m2!3d13.0280416!4d80.2681674!16s%2Fg%2F11h3k0tc7n?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D" className='text-[#046bd2] underline'>"30, Norton Rd, Mandavelipakkam, Raja Annamalai Puram,Chennai, Tamil Nadu 600028"</a>
                    </p>
                    <h2 className='text-lg font-bold pt-3 text-black'>Must have(s):-</h2>
                    <ol className='pt-3'>
                      <li style={{listStyle: 'none',lineHeight:'25px'}}>a) Aptitude and Logical reasoning</li>
                      <li style={{listStyle: 'none',lineHeight:'25px'}}>b) Linear algebra, Calculus, Probability &amp; Statistics</li>
                      <li style={{listStyle: 'none',lineHeight:'25px'}}>c) Strong Programming Foundations in C++ or Java</li>
                      {/* <li>Expertise in Python programming</li>
                      <li>A solid foundation in calculus and statistics</li>
                      <li>The drive to be among few in the country working on understanding and creating LLMs</li> */}
                    </ol>
                    {/* <p className='dedi'>Then you might be the perfect fit for our team.</p> */}
                    <h2 className='text-lg font-bold pt-3 text-black'><span className='underline'>How to apply</span>:-</h2>
                      <p className='dedi'>Before applying, please ensure you read this carefully:</p>
                      <p className='pt-1'><img style={{ float:'left', marginRight:'7px'}} src='/images/join.png'></img><Link to="/join-our-team"  className="font-medium text-[#046bd2] underline pt-2">Joining Our Research Unit</Link></p>
                    <p className='dedi'> You are welcome to walk in for an interview on any working day, or you can reach out to us via:</p>
                    <ul className='models'>
                      <li><strong>Contact Number: </strong> +91 8925987250</li>
                      <li><strong>Email: </strong> careers.chennai@blubridge.com</li>
                      <li><strong>LinkedIn: </strong><a className='text-[#046bd2] underline' href='https://www.linkedin.com/company/blubridge/'>https://linkedin.com/blubridge</a></li>
                    </ul>
                </div>
                </div>
        </div>
    </section>

    </div>
    </>
  )
 
};

export default Careers;
