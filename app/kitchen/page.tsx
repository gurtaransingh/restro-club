import { kitchenOrders } from "@/lib/operations-data";

const statuses = ["Received", "Accepted", "Preparing", "Ready", "Served", "Completed"];

export default function KitchenPage() {
  return (
    <main className="innerPage operationsPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero">
        <p className="eyebrow">Kitchen management system</p>
        <h1>Live order queue for chefs, super chefs and restaurant managers.</h1>
        <p>
          Orders from QR tables, online carts and staff-assisted service should land here with modifications,
          priority, preparation targets and real-time customer status updates.
        </p>
      </section>
      <section className="sectionWrap flushTop">
        <div className="kanbanStatus">{statuses.map((status) => <span key={status}>{status}</span>)}</div>
        <div className="orderGrid">
          {kitchenOrders.map((order) => (
            <article className="orderCard" key={order.id}>
              <div className="cardTopline"><span>{order.id}</span><strong>{order.status}</strong></div>
              <h2>{order.table}</h2>
              <p>{order.customer} • {order.priority} priority • Target {order.prepTarget}</p>
              <ul>{order.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <em>{order.notes}</em>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
