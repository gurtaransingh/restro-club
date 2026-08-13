import { customerActivities } from "@/lib/operations-data";
import { getPortalSummary } from "@/lib/portal-service";
import {
  accountSummary,
  portalAgenda,
  portalInvoices,
  portalNotifications,
  portalPreferences,
  portalQuickActions,
  portalReadiness,
  portalRequests,
} from "@/lib/portal-data";

export default function PortalPage() {
  const portalSummary = getPortalSummary();

  return (
    <main className="innerPage portalPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero portalHero">
        <p className="eyebrow">Customer self-service portal</p>
        <h1>Everything a guest needs after discovery lives in one premium dashboard.</h1>
        <p>
          The portal connects identity, ordering, bookings, stays, events, invoices, notifications, loyalty,
          support and preferences so every customer interaction can continue without staff re-entry.
        </p>
      </section>

      <section className="sectionWrap flushTop dashboardGrid expanded">
        {portalSummary.metrics.map((metric) => (
          <article className="metricCard" key={metric.label}>
            <small>Portal</small>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section className="sectionWrap flushTop portalCommandGrid">
        <article className="profileCard featuredProfile">
          <span>{accountSummary.tier}</span>
          <h2>{accountSummary.guest}</h2>
          <p>{accountSummary.memberSince} • {accountSummary.homeLocation}</p>
          <strong>{accountSummary.loyaltyPoints} • {accountSummary.nextReward}</strong>
        </article>
        <div className="portalActionPanel">
          {portalQuickActions.map((action) => (
            <a className="actionCard" href={action.href} key={action.label}>
              <strong>{action.label}</strong>
              <span>{action.detail}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="sectionWrap flushTop threeColumnOps">
        <div>
          <p className="eyebrow">Agenda</p>
          <h2>Upcoming moments.</h2>
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
          <p className="eyebrow">Invoices</p>
          <h2>Payments and documents.</h2>
          <div className="activityList compact">
            {portalInvoices.map((invoice) => (
              <article className="activityCard" key={invoice.id}>
                <span>{invoice.status}</span>
                <h2>{invoice.id}</h2>
                <p>{invoice.module} • {invoice.issuedAt}</p>
                <strong>{invoice.amount}</strong>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Notifications</p>
          <h2>Messages needing attention.</h2>
          <div className="activityList compact">
            {portalNotifications.map((notification) => (
              <article className="activityCard" key={`${notification.channel}-${notification.title}`}>
                <span>{notification.urgency}</span>
                <h2>{notification.title}</h2>
                <p>{notification.channel} • {notification.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sectionWrap flushTop twoColumn">
        <div>
          <p className="eyebrow">Known preferences</p>
          <h2>Personalization follows the guest across departments.</h2>
          <div className="activityList compact">
            {portalPreferences.map((preference) => (
              <article className="activityCard" key={preference.label}>
                <span>{preference.owner}</span>
                <h2>{preference.label}</h2>
                <p>{preference.value}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Open requests</p>
          <h2>Support, quotes and concierge actions are trackable.</h2>
          <div className="activityList compact">
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

      <section className="sectionWrap flushTop">
        <div className="sectionIntro wide">
          <p className="eyebrow">Completion map</p>
          <h2>The portal is now represented as a complete customer surface with clear backend handoff points.</h2>
        </div>
        <div className="flowGrid">
          {portalReadiness.map((item) => (
            <article className="flowCard" key={item.module}>
              <span>{item.progress}</span>
              <h3>{item.module}</h3>
              <p>{item.nextBuild}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionWrap flushTop">
        <div className="sectionIntro wide">
          <p className="eyebrow">Recent activity</p>
          <h2>Existing account history still feeds the self-service timeline.</h2>
        </div>
        <div className="activityList">
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
