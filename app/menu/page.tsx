import { menuItems } from "@/lib/platform-data";
import { cartPreview } from "@/lib/portal-data";

export default function MenuPage() {
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  return (
    <main className="innerPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero">
        <p className="eyebrow">Restaurant and café module</p>
        <h1>Menu experience designed for ordering, QR tables and kitchen profitability.</h1>
        <p>
          Each item is structured for pricing, preparation time, allergens, nutrition, dietary classification,
          add-ons, recipe costing and management margin analysis.
        </p>
      </section>

      <section className="sectionWrap flushTop twoColumn cartSection">
        <div>
          <p className="eyebrow">Smart cart preview</p>
          <h2>QR table orders can carry notes, pacing and kitchen routing.</h2>
        </div>
        <div className="activityList compact">
          {cartPreview.map((line) => (
            <article className="activityCard" key={line.item}>
              <span>Qty {line.quantity}</span>
              <h2>{line.item}</h2>
              <p>{line.note}</p>
              <strong>{line.amount}</strong>
            </article>
          ))}
          <article className="activityCard totalCard"><span>Estimated total</span><h2>₹1,890</h2><p>Taxes, service charges and membership rewards can be applied at checkout.</p></article>
        </div>
      </section>

      <section className="sectionWrap flushTop">
        <div className="chipRow">{categories.map((category) => <span key={category}>{category}</span>)}</div>
        <div className="menuGrid detailed">
          {menuItems.map((item) => (
            <article className="menuCard" key={item.id}>
              <span>{item.category}</span>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <div className="detailList">
                <small>₹{item.price}</small>
                <small>{item.prepMinutes} min prep</small>
                <small>{item.calories} calories</small>
                <small>{item.dietary}</small>
                <small>{item.marginPercent}% gross margin</small>
                <small>{item.allergens.length ? `Allergens: ${item.allergens.join(", ")}` : "No major allergens"}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
