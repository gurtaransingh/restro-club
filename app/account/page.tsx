import { customerActivities } from "@/lib/operations-data";
import { accountSummary, portalAgenda, portalPreferences, portalRequests } from "@/lib/portal-data";

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
      <section className="sectionWrap flushTop accountCommand">
        <article className="profileCard">
          <span>{accountSummary.tier}</span>
          <h2>{accountSummary.guest}</h2>
          <p>{accountSummary.memberSince} • {accountSummary.homeLocation}</p>
          <strong>Relationship manager: {accountSummary.relationshipManager}</strong>
        </article>
        <article className="walletCard">
          <span>Wallet balance</span>
          <h2>{accountSummary.walletBalance}</h2>
          <p>{accountSummary.loyaltyPoints}</p>
          <strong>{accountSummary.nextReward}</strong>
        </article>
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

      <section className="sectionWrap flushTop twoColumn">
        <div>
          <p className="eyebrow">Today and upcoming</p>
          <h2>A unified itinerary across every Restro Club module.</h2>
          <div className="activityList compact">
            {portalAgenda.map((item) => (
              <article className="activityCard" key={`${item.module}-${item.time}`}>
                <span>{item.module}</span>
                <h2>{item.title}</h2>
                <p>{item.time} • {item.status}</p>
                <strong>{item.action}</strong>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Preferences and support</p>
          <h2>Service teams see context without asking guests again.</h2>
          <div className="activityList compact">
            {portalPreferences.map((preference) => (
              <article className="activityCard" key={preference.label}>
                <span>{preference.owner}</span>
                <h2>{preference.label}</h2>
                <p>{preference.value}</p>
              </article>
            ))}
            {portalRequests.map((request) => (
              <article className="activityCard" key={request.id}>
                <span>{request.status}</span>
                <h2>{request.topic}</h2>
                <p>{request.id}</p>
                <strong>{request.nextStep}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
