import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { caseStudiesData } from '../data/caseStudies';

export function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const study = caseStudiesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!study && id) {
      navigate('/');
    }
  }, [id, study, navigate]);

  if (!study) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen border-t border-black/10">
      <div className="container mx-auto px-6 md:px-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted hover:text-neutral-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-500/10 rounded-full">
              {study.niche}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              {study.client}
            </h1>
            <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
              {study.description}
            </p>
            <div className="flex items-end gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl inline-flex w-full md:w-auto">
               <div>
                  <div className="text-sm font-medium text-muted uppercase tracking-wider mb-1">Key Achievement</div>
                  <div className="text-4xl font-display font-bold text-neutral-900 mb-1"><span className="text-blue-500">{study.metric}</span> {study.metricLabel}</div>
               </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] rounded-3xl overflow-hidden"
          >
             <img src={study.image} alt={study.client} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-display font-bold mb-6">The Challenge</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-12">
              {study.challenge}
            </p>
            <h2 className="text-2xl font-display font-bold mb-6">Our Solution</h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {study.fullDescription}
            </p>
          </div>
          <div>
            <div className="p-8 rounded-3xl bg-white shadow-sm border border-neutral-200 sticky top-32">
               <h3 className="text-xl font-display font-bold mb-6">Key Results</h3>
               <ul className="space-y-4">
                 {study.results.map((result, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                     <span className="text-neutral-700">{result}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {study.gallery && study.gallery.length > 0 && (
          <div className="mb-24">
             <h2 className="text-2xl font-display font-bold mb-8 text-center">Project Gallery</h2>
             <div className="grid md:grid-cols-2 gap-6">
                {study.gallery.map((img, i) => (
                  <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-neutral-200">
                     <img src={img} alt={`${study.client} gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
