# Sam's NZ — Design Review, Round 1

**How to look:** open `http://localhost:4399/sams-nz-canvas.html`. It is one long
page: the homepage, then every other page of the site stacked below it — tours,
two tour-detail pages, the booking flow, guides, FAQ, contact. Click **№ sections**
(top right) or press **n** to overlay section numbers, and answer by number —
"04 feels crowded" is a complete, useful answer.

**One important viewing note:** your browser is zoomed (~150%+), which puts the
canvas in its tablet layout. That's a real layout and worth judging — but to see
the **desktop** version (booking panel sticky at the right of tour pages, wider
grids), press **Cmd&nbsp;−** once or twice. Both layouts exist; you're just
usually looking at the narrower one.

**How to answer:** one message, any order, any format. "1: yes. 2: option B.
7: rewrite it." covers it. Anything you don't mention, I'll treat as
good-enough-for-now (nothing locks without your explicit yes except things
you've already approved).

---

## The questions that steer everything

**1. The two figures (guides section, homepage §07).** The back-to-back
silhouettes are doing a placeholder's job in a hero's spot, and honestly they
read a bit "wrapped statues." Your call:
   - **(a) I source licensed stock photos now** — two real (model-released)
     people, arms crossed, cut out and dropped into the same spot. Feels far
     more real; the faces will be strangers until Sam swaps in.
   - **(b) Keep stylised figures** until Sam supplies real photos — honest,
     but the weakest visual on the site sits in the trust-critical spot.
   - My lean: **(a)**.

**2. Struck-through competitor prices.** They're everywhere — "$219 ~~$259
elsewhere~~ · FIRST SEASON". Three sub-questions:
   - Comfortable with the aggressive comparison framing at all?
   - "elsewhere" — or name it less coyly ("big operators' list price")? We never
     name Cheeky Kiwi on-site (that feels wrong to me while Sam works there —
     confirm).
   - Waiheke has no struck price (no direct competitor product, only a market
     range). Fine to leave it as the one price without a comparison?

**3. The tour mix (tours page, §11–12).** Ten tours: seven day tours, two
2-day weekenders, one 4-day. Anything to kill, merge, or add? Two I'm least
sure of: **Waitomo Caves & Rotorua** (overlaps two other combos — it exists
because Cheeky Kiwi sells that exact combo) and **Auckland in a Day** (the
lowest-margin, most-commodity product). The 4-day **Volcanic Heartland** is
positioned as the flagship — agree?

**4. The voice.** The copy runs personal and occasionally cheeky: "Coffee stop
non-negotiable," "Spades (trust us)," "knows every gannet by first name
(unverified)," "1 van (a second when it earns it)." Where's your line? Tell me
if any specific line crosses it, or say "dial it up / down 20%" and I'll
calibrate everything.

**5. Booking flow (§17–18).** On the canvas all five steps are stacked so you
can review them at once. For the real build: **one step at a time** (like a real
checkout, more theatre) or **one long page** (less clicking, more honest about
being a demo)? My lean: one step at a time — the grill said "real feel."

**6. Policy numbers I invented** (FAQ §21–22): multi-day free-cancel to 7 days
/ 50% to 72 hours; deposit-then-balance-14-days-out; "we run at two guests or
we rebook you free"; children ≈55% on day tours; Waiheke 18+. All are
SAM-VERIFY items — but do any read *wrong to you* as defaults?

**7. The map band (homepage §04).** Keep it homepage-only, or repeat a smaller
version on the tours page? My lean: homepage-only — it's a showpiece, not
wayfinding.

**8. Mobile navigation.** The ≡ burger is currently decorative. Real build
default: tapping it opens a full-screen dark menu (tours / days out / guides /
book), E-styled. Any objection?

---

## Points of feedback from me (no action needed unless you disagree)

- **Strongest sections** as built: the island map band, the booking date-strip
  with per-day prices (stolen shamelessly from CK's best pattern), and the
  checkout/receipt pair. I'd protect these through future rounds.
- **The guides dark band** (§19) has deliberate empty space at desktop width.
  I like the restraint; flagging in case it reads unfinished to you.
- **Two card images** are weak crops at some widths (Auckland in a Day, and the
  Tongariro weekender's cloud) — I've nudged them; if a card still looks dull
  to you, name it and I'll swap the photo entirely.
- The **"first season" mechanic** (loud discount now, step-up when reviews
  arrive) is load-bearing across the whole site — pricing, FAQ, copy. If Sam
  hates it, much changes; worth pressure-testing with him early.

---

## Where Stream B is (no input needed)

Foundations are proceeding behind the scenes while you review: the font-loading
defect fix, the identity sweep (Sam's NZ / Auckland / max 11 / 1–4 days), the
repriced catalogue, and the zh-Hans locale plumbing — all test-first, all
reported in the next batch. Nothing there needs your eyes yet.
