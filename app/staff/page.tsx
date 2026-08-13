import { staffRecords } from "@/lib/operations-data";

export default function StaffPage() {
  return (
    <main className="innerPage operationsPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero">
        <p className="eyebrow">Employee, attendance and payroll</p>
        <h1>HR records designed for departments, designations, attendance history and salary versions.</h1>
        <p>
          Payroll data should be historical, auditable and linked to attendance, leaves, overtime, advances,
          deductions and role-based approvals.
        </p>
      </section>
      <section className="sectionWrap flushTop tableShell">
        <table>
          <thead>
            <tr><th>Employee</th><th>Department</th><th>Designation</th><th>Attendance</th><th>Pay scale</th></tr>
          </thead>
          <tbody>
            {staffRecords.map((staff) => (
              <tr key={staff.employeeId}>
                <td><strong>{staff.name}</strong><span>{staff.employeeId}</span></td>
                <td>{staff.department}</td>
                <td>{staff.designation}</td>
                <td>{staff.attendance}</td>
                <td>{staff.payScale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
