import { bookingSteps, experiences } from "@/lib/platform-data";

export default function BookingPage() {
  return (
    <main className="innerPage">
      <a className="backLink" href="/">← Restro Club</a>
      <section className="pageHero compactHero">
        <p className="eyebrow">Unified booking engine</p>
        <h1>One flow for tables, sports, pool sessions, rooms, events and membership-led benefits.</h1>
        <p>
          The first version models the customer journey and facility catalog. The production booking engine should
          add conflict prevention, payments, cancellation policies, refunds, reminders and admin calendars.
        </p>
      </section>

      <section className="sectionWrap flushTop">
        <div className="flowGrid">
          {bookingSteps.map((step, index) => (
            <article className="flowCard" key={step.title}>
              <span>0{index + 1}</span>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sectionWrap flushTop">
        <div className="sectionIntro wide">
          <p className="eyebrow">Bookable catalog</p>
          <h2>Facilities are configurable instead of hardcoded to the first location.</h2>
        </div>
        <div className="experienceGrid">
          {experiences.map((experience) => (
            <article className="experienceCard" key={experience.id}>
              <span>{experience.type}</span>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
