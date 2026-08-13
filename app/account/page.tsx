import { customerActivities } from "@/lib/operations-data";

const accountSections = ["Profile", "Orders", "Bookings", "Payments", "Coupons", "Rewards", "Invoices", "Notifications"];

export default function AccountPage() {
  return (
    <main className="innerPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero">
        <p className="eyebrow">Customer account</p>
        <h1>One customer identity for restaurant, sports, pool, stay, events, membership and loyalty.</h1>
        <p>
          The account dashboard centralizes active orders, upcoming bookings, payments, invoices, points,
          coupons, preferences, notifications and review prompts.
        </p>
      </section>
      <section className="sectionWrap flushTop twoColumn accountLayout">
        <aside className="sidePanel">{accountSections.map((section) => <a href="#activity" key={section}>{section}</a>)}</aside>
        <div id="activity" className="activityList">
          {customerActivities.map((activity) => (
            <article className="activityCard" key={activity.id}>
              <span>{activity.type}</span>
              <h2>{activity.title}</h2>
              <p>{activity.date}</p>
              <strong>{activity.status}</strong>
              <em>{activity.amount}</em>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
