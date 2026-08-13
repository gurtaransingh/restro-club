import { menuItems } from "@/lib/platform-data";

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
