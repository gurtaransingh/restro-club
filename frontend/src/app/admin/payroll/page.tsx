'use client';

import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Briefcase, DollarSign, CheckCircle2, UserCheck, Shield } from 'lucide-react';
import { calculatePayscaleSalary } from '../../../lib/types';

export default function PayrollAdminPage() {
  const { allUsers, activeLocation } = useApp();
  const staffMembers = allUsers.filter((u) => u.category !== 'MEMBER');

  const totalMonthlyPayroll = staffMembers.reduce(
    (acc, u) => acc + calculatePayscaleSalary(u.payscaleLevel ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1E241D] pb-24 space-y-8">
      <section className="bg-[#EDE6D8] py-8 px-4 sm:px-6 lg:px-8 border-b border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8C5A3C]/15 text-[#8C5A3C] text-[10px] font-bold uppercase tracking-wider rounded-full mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>HR & Payroll Ledger</span>
            </div>
            <h1 className="font-serif italic text-3xl font-bold text-[#1E241D]">
              Staff Rosters, Payscales (0–50) & Payroll
            </h1>
            <p className="text-xs text-[#5C554E] mt-1">
              Automated formula disbursement: Level N = ₹10,000 + N × ₹2,000 / month.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#E5DEC9] rounded-2xl shadow-sm">
            <span className="text-[10px] font-bold uppercase text-[#5C554E] block">Monthly Payroll Commitment</span>
            <span className="font-serif italic text-2xl font-bold text-[#8C5A3C]">
              ₹{totalMonthlyPayroll.toLocaleString()} / mo
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5DEC9] rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#E5DEC9] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E241D]">
              Employed Staff & Management ({staffMembers.length})
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EDE6D8] text-[10px] uppercase font-bold text-[#5C554E]">
                <tr>
                  <th className="p-4">Staff Member</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Payscale Level</th>
                  <th className="p-4">Calculated Salary</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4">Disbursement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DEC9]">
                {staffMembers.map((u) => {
                  const salary = calculatePayscaleSalary(u.payscaleLevel ?? 0);
                  return (
                    <tr key={u.id} className="hover:bg-[#FAF8F3]">
                      <td className="p-4">
                        <strong className="font-bold text-[#1E241D] block">{u.name}</strong>
                        <span className="text-[10px] text-[#5C554E]">{u.email} • {u.phone}</span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-[#8C5A3C]/10 text-[#8C5A3C] text-[10px] font-bold uppercase rounded">
                          {u.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-[#1E241D]">Level {u.payscaleLevel ?? 0}</td>
                      <td className="p-4 font-serif italic text-sm font-bold text-[#3E4A38]">
                        ₹{salary.toLocaleString()} / month
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                          100% Present
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Direct Bank Auto-ACH</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
