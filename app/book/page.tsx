import { bookingSteps, experiences } from "@/lib/platform-data";
import { availabilitySlots } from "@/lib/portal-data";

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

      <section className="sectionWrap flushTop bookingConsole">
        <div className="sectionIntro wide">
          <p className="eyebrow">Guided booking request</p>
          <h2>Capture enough detail to confirm, quote or waitlist every journey.</h2>
        </div>
        <form className="portalForm">
          <label>Experience<select defaultValue="Restaurant"><option>Restaurant</option><option>Sports</option><option>Pool</option><option>Stay</option><option>Event</option></select></label>
          <label>Date<input type="date" defaultValue="2026-08-22" /></label>
          <label>Guests or players<input type="number" min="1" defaultValue="4" /></label>
          <label>Preferred time<input type="time" defaultValue="20:30" /></label>
          <label className="wideField">Special request<textarea defaultValue="Birthday dinner with poolside seating if available." /></label>
          <button type="button">Create booking request</button>
        </form>
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
          <p className="eyebrow">Available now</p>
          <h2>Sample slots demonstrate conflict-aware inventory across modules.</h2>
        </div>
        <div className="availabilityGrid">
          {availabilitySlots.map((slot) => (
            <article className="availabilityCard" key={slot.id}>
              <span>{slot.module}</span><h3>{slot.resource}</h3><p>{slot.time} • {slot.capacity}</p><strong>{slot.price}</strong><em>{slot.status}</em>
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
