import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Ruler, Shirt, HelpCircle } from "lucide-react";
import PageWrapper from "../../components/layout/PageWrapper";

const sizeData = [
  { size: "S", chest: "36-38", waist: "30-32", hip: "36-38" },
  { size: "M", chest: "38-40", waist: "32-34", hip: "38-40" },
  { size: "L", chest: "40-42", waist: "34-36", hip: "40-42" },
  { size: "XL", chest: "42-44", waist: "36-38", hip: "42-44" },
];

const SizeGuide = () => (
  <>
    <Helmet>
      <title>Size Guide – EcoWear</title>
      <meta
        name="description"
        content="Find your perfect fit with EcoWear's size guide. Measurements in inches for men and women."
      />
    </Helmet>
    <PageWrapper title="Size Guide">
      <div className="space-y-8">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-3">
            <Ruler className="w-6 h-6 text-[#16a34a]" />
            <h2 className="text-xl font-semibold text-gray-900">How to Measure</h2>
          </div>
          <p className="text-gray-600">
            Use a soft measuring tape and keep it snug but not tight. Measure over undergarments for the most accurate fit.
          </p>
        </motion.div>

        {/* Size Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-md"
        >
          <div className="p-6 flex items-center gap-3 border-b border-gray-100">
            <Shirt className="w-6 h-6 text-[#16a34a]" />
            <h2 className="text-xl font-semibold text-gray-900">Men's & Women's Tops</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#16a34a]/5 text-gray-700">
                <tr>
                  <th className="px-6 py-3 font-semibold">Size</th>
                  <th className="px-6 py-3 font-semibold">Chest (in)</th>
                  <th className="px-6 py-3 font-semibold">Waist (in)</th>
                  <th className="px-6 py-3 font-semibold">Hip (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {sizeData.map((row, i) => (
                  <motion.tr
                    key={row.size}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:bg-green-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{row.size}</td>
                    <td className="px-6 py-4">{row.chest}</td>
                    <td className="px-6 py-4">{row.waist}</td>
                    <td className="px-6 py-4">{row.hip}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-sm text-gray-500 italic">
            * All measurements are in inches. If you are between sizes, we recommend sizing up for a relaxed fit.
          </div>
        </motion.div>

        {/* Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-3">
            <HelpCircle className="w-6 h-6 text-[#16a34a]" />
            <h2 className="text-xl font-semibold text-gray-900">Need More Help?</h2>
          </div>
          <p className="text-gray-600">
            Contact us at <a href="mailto:support@ecowear.in" className="text-[#16a34a] underline">support@ecowear.in</a> and we’ll help you find the perfect size.
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  </>
);

export default SizeGuide;
