import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Plus, Minus, Linkedin } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
// import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet';

const JoinOurTeam = () => {
 return (
     <>
        {/* <Helmet> */}
             <title>Join our Research Team - Blubridge</title>
        {/* </Helmet> */}
    <div>
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
            
            <div className='main-inner'>
                <div className="rounded-xl p-8 px-9 shadow-lg border border-gray-200/50 inner-page">
                    <h1 className='font-bold text-3xl text-black mb-2 text-center underline'><span className='text-3xl mobj'>Joining our Deep Learning Research Team</span></h1>
                    <h2 className='font-bold text-center' style={{ fontSize:'1.7rem'}}><span className='mobj1'>What You Need to Know ?</span></h2>
                   <div style={{ borderTop: '1px solid #eee', marginTop:'1.5em' }}></div>
                    <h3 className='subhead' style={{ border:'none', marginTop:'0' }}>a) Are we a startup?</h3>
                    <p className='pl-6 pt-3'>
                    <strong>No.</strong> We are a <strong>Deep Learning Research Organization,</strong> not a startup.
                    </p>
                    <h3 className='subhead'>b) Who is funding us?</h3>
                    <p className='pl-6 pt-3'>We are entirely <strong>self-funded.</strong></p>
                    <h3 className='subhead'>c) Am I eligible to apply?</h3>
                    <p className='pl-6 pt-3'>Ask yourself the following:</p>
                    <ul className='faq-list pt-3'>
                      <li>Do I truly understand the <strong>depth of Deep Learning research?</strong></li>
                      <li>Am I aware this is a pragmatic, mathematics-driven science, not just a language task?</li>
                      <li>Am I ready to work with first principles of Machine Learning, not frameworks alone?</li>
                    </ul>
<h3 className='subhead'>d) Where do I begin? What should I study for the interview?</h3>
                    <ul className='faq-list pt-3'>
         <li>Begin by appearing for the <strong>initial interview rounds.</strong></li>
         <li>If selected, you’ll be invited to a <strong>second stage,</strong> where a strong grasp of Mathematics for Machine Learning is essential.</li>
         <li>You’ll get <strong>up to a month</strong> to prepare.</li>
         <li >Final selection is based on a <strong>Maths for Deep Learning</strong> test.</li>            
</ul>
<h3 className='subhead'>e) How is the pay?</h3>
<p className='pl-6 pt-3'>We offer competitive compensation, but ask you to consider:</p>
<ul className='faq-list pt-3'>
 <li>You’ll be working on Deep Learning from first principles — how many organizations offer that?</li>
 <li>We are among the very few in India genuinely building a foundation model, not just hyping it.</li>
 <li>Building from “first principles” is not the same as starting “from scratch.”</li>
 <li>
If you were to study this in a university:
<ul className='faq-list1 pt-3'>
<li>You’d likely go abroad (e.g., the US),</li>
<li>Pay for a Master’s degree,</li>
<li>Learn theory & practical without real-world application.</li>
</ul>
</li>
</ul>

<p className='pl-6 pt-4' style={{ fontSize:'0.95rem'}}><strong><img style={{ float:'left', marginRight:'10px'}} src="/images/bulbi.png"></img> If compensation is your main driver,</strong> you will find better-paying jobs. We are seeking <strong>like-minded individuals</strong> who value the mission over money.</p>
<h3 className='subhead'>f) Why is this opportunity unique?</h3>
<ul className='faq-list pt-3'>
<li>We offer a <strong>rare research environment</strong> focused solely on <strong>foundation model development.</strong></li>
<li>We're assembling a team of <strong>passionate, like-minded individuals</strong></li>
<li>Whether you're a research scholar or a self-taught enthusiast — if you have the fire to understand and build <strong>Large Language Models,</strong> you're welcome to apply.</li>
</ul>
<h3 className='subhead'>g) Who should not apply?</h3>
<ul className='faq-list pt-3'>
<li>Those looking for a <strong>routine 9-to-5 job</strong></li>
<li>Anyone who <strong>struggled with 12th-grade mathematics</strong></li>
</ul>


                </div>
                </div>
        </div>
    </section>

    </div>
    </>
  )
};

export default JoinOurTeam;
