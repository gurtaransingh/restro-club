import { menuItems } from "@/lib/platform-data";

type PageProps = { params: Promise<{ tableId: string }> };

export default async function QrTablePage({ params }: PageProps) {
  const { tableId } = await params;

  return (
    <main className="innerPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero">
        <p className="eyebrow">QR table ordering</p>
        <h1>Table {tableId} is ready for ordering.</h1>
        <p>
          A production QR session would validate location, table, active session, open bill, staff assignment
          and kitchen routing before showing the menu.
        </p>
      </section>
      <section className="sectionWrap flushTop">
        <div className="statusBoard">
          <div className="statusRow"><span>01</span><strong>Table identified</strong><em>Table {tableId}</em></div>
          <div className="statusRow"><span>02</span><strong>Session active</strong><em>Guest ordering enabled</em></div>
          <div className="statusRow"><span>03</span><strong>Kitchen route</strong><em>Main kitchen dashboard</em></div>
        </div>
        <div className="menuGrid">
          {menuItems.map((item) => (
            <article className="menuCard" key={item.id}>
              <span>{item.category}</span>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <strong>₹{item.price}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
