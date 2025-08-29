import React from "react"; import { Card, CardContent } from "@/components/ui/card"; import { ArrowRight, ArrowDown } from "lucide-react"; import { motion } from "framer-motion";

export default function DashboardFlow() { const sections = [ { title: "Landing Dashboard", color: "bg-yellow-100", js: "main.js", api: "helpers.js", data: "medicines.json", }, { title: "Inventory Dashboard", color: "bg-green-100", js: "inventory.js", api: "medicines.js", data: "suppliers.json", }, { title: "Sales Analytics", color: "bg-orange-100", js: "analytics.js", api: "sales.js", data: "sales.json", }, { title: "Sandbox", color: "bg-red-100", js: "sandbox.js", api: "(simulation)", data: "-", }, ];

return ( <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 space-y-10"> <h1 className="text-2xl font-bold text-gray-800 mb-6"> Pharmacy Dashboard Flow </h1>

<div className="flex items-center space-x-6">
    {sections.map((s, idx) => (
      <React.Fragment key={s.title}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
        >
          <Card className={`${s.color} rounded-2xl shadow-md w-52`}>
            <CardContent className="p-4 text-center">
              <h2 className="font-semibold text-gray-700">{s.title}</h2>
            </CardContent>
          </Card>

          <div className="flex flex-col items-center mt-2">
            <ArrowDown className="text-gray-400" />
            <Card className="bg-white border w-44 rounded-xl shadow-sm mt-2">
              <CardContent className="p-2 text-sm text-gray-600">
                {s.js}
              </CardContent>
            </Card>
            <ArrowDown className="text-gray-400" />
            <Card className="bg-white border w-44 rounded-xl shadow-sm mt-2">
              <CardContent className="p-2 text-sm text-gray-600">
                {s.api}
              </CardContent>
            </Card>
            {s.data !== "-" && (
              <>
                <ArrowDown className="text-gray-400" />
                <Card className="bg-white border w-44 rounded-xl shadow-sm mt-2">
                  <CardContent className="p-2 text-sm text-gray-600">
                    {s.data}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </motion.div>

        {idx < sections.length - 1 && (
          <ArrowRight className="text-gray-500" size={32} />
        )}
      </React.Fragment>
    ))}
  </div>
</div>

); }
