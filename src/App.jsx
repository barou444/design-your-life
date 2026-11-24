import { useState, useEffect } from "react";
import {
  Heart,
  BriefcaseBusiness,
  Sun,
  Leaf,
  Check,
  Sparkles,
  Flower2,
  CalendarDays,
  RotateCcw
} from "lucide-react";

const categories = [
  {
    name: "Health",
    icon: Leaf,
    color: "health",
    description: "Nourish your mind and body.",
    question: "How am I caring for myself?",
    habits: [
      "Get enough rest",
      "Move my body",
      "Eat nourishing meals",
      "Take time to recharge"
    ]
  },
  {
    name: "Work",
    icon: BriefcaseBusiness,
    color: "work",
    description: "Grow with purpose and intention.",
    question: "What meaningful progress can I make?",
    habits: [
      "Work toward an important goal",
      "Learn something new",
      "Stay organized",
      "Celebrate progress"
    ]
  },
  {
    name: "Play",
    icon: Sun,
    color: "play",
    description: "Make room for joy and creativity.",
    question: "What makes life enjoyable?",
    habits: [
      "Enjoy a favorite hobby",
      "Spend time outdoors",
      "Try something new",
      "Make time for fun"
    ]
  },
  {
    name: "Love",
    icon: Heart,
    color: "love",
    description: "Nurture meaningful connections.",
    question: "How can I strengthen my connections?",
    habits: [
      "Connect with someone I care about",
      "Show appreciation",
      "Practice kindness",
      "Make time for relationships"
    ]
  }
];

const getInitialData = () => {
  try {
    return JSON.parse(localStorage.getItem("lifeDashboard")) || {};
  } catch {
    return {};
  }
};

export default function App() {
  const [data, setData] = useState(getInitialData);

  const [focus, setFocus] = useState("Health");

  const [reflection, setReflection] = useState(
    data.reflection || ""
  );

  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    })
  );

  useEffect(() => {
    localStorage.setItem(
      "lifeDashboard",
      JSON.stringify({
        ...data,
        reflection
      })
    );
  }, [data, reflection]);

  const toggleHabit = (category, habit) => {
    setData(previous => ({
      ...previous,
      [category]: {
        ...previous[category],
        [habit]: !previous[category]?.[habit]
      }
    }));
  };

  const updateGoal = (category, value) => {
    setData(previous => ({
      ...previous,
      goals: {
        ...previous.goals,
        [category]: value
      }
    }));
  };

  const completed = categories.reduce((total, category) => {
    return total + category.habits.filter(
      habit => data[category.name]?.[habit]
    ).length;
  }, 0);

  const total = categories.reduce(
    (sum, category) => sum + category.habits.length,
    0
  );

  const progress = Math.round((completed / total) * 100);

  const resetDashboard = () => {
    if (window.confirm("Reset all your check-ins and notes?")) {
      setData({});
      setReflection("");
    }
  };

  return (
    <div className="dashboard">

      {/* HEADER */}

      <header className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <Flower2 size={16} />
            YOUR PERSONAL LIFE DASHBOARD
          </div>

          <h1>Design a life<br />
            <span>you love.</span>
          </h1>

          <p>
            A little more intention. A little more balance.
            A life that feels like yours.
          </p>

          <div className="date">
            <CalendarDays size={16} />
            {date}
          </div>
        </div>

        <div className="hero-decoration">
          <Leaf size={110} strokeWidth={0.7} />
          <Flower2 size={65} strokeWidth={0.7} />
        </div>
      </header>

      {/* PROGRESS */}

      <section className="progress-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR DAILY CHECK-IN</span>
            <h2>Your daily balance</h2>
          </div>

          <span className="progress-number">
            {progress}%
          </span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="muted">
          {completed} of {total} habits completed.
          Every small step counts.
        </p>
      </section>

      {/* FOUR PILLARS */}

      <section className="pillars-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE FOUR PILLARS</span>
            <h2>Your life, in balance.</h2>
          </div>
          <Sparkles className="heading-icon" />
        </div>

        <div className="pillar-grid">
          {categories.map(category => {
            const Icon = category.icon;

            const habits = category.habits;
            const done = habits.filter(
              habit => data[category.name]?.[habit]
            ).length;

            return (
              <article
                className={`pillar-card ${category.color}`}
                key={category.name}
              >
                <div className="pillar-top">
                  <div className="pillar-icon">
                    <Icon size={25} />
                  </div>

                  <span className="habit-count">
                    {done}/{habits.length}
                  </span>
                </div>

                <h3>{category.name}</h3>
                <p className="pillar-description">
                  {category.description}
                </p>

                <div className="habit-list">
                  {habits.map(habit => (
                    <label
                      className="habit"
                      key={habit}
                    >
                      <input
                        type="checkbox"
                        checked={
                          !!data[category.name]?.[habit]
                        }
                        onChange={() =>
                          toggleHabit(category.name, habit)
                        }
                      />

                      <span className="custom-check">
                        <Check size={13} />
                      </span>

                      <span className={
                        data[category.name]?.[habit]
                          ? "habit-done"
                          : ""
                      }>
                        {habit}
                      </span>
                    </label>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* WEEKLY FOCUS */}

      <section className="focus-card">
        <span className="eyebrow">INTENTIONAL LIVING</span>
        <h2>Design your week.</h2>

        <p className="muted">
          Choose an area of life to give extra attention this week.
        </p>

        <div className="focus-tabs">
          {categories.map(category => (
            <button
              key={category.name}
              className={
                focus === category.name ? "active" : ""
              }
              onClick={() => setFocus(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="goal-area">
          <h3>My focus: {focus}</h3>

          <p>
            {categories.find(c => c.name === focus).question}
          </p>

          <textarea
            value={data.goals?.[focus] || ""}
            onChange={e => updateGoal(focus, e.target.value)}
            placeholder="What is one meaningful thing I want to accomplish?"
          />
        </div>
      </section>

      {/* REFLECTION */}

      <section className="reflection-card">
        <div className="reflection-icon">
          <Heart size={22} />
        </div>

        <span className="eyebrow">A MOMENT FOR YOURSELF</span>
        <h2>Evening reflection.</h2>

        <p className="muted">
          What went well today? What are you grateful for?
        </p>

        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          placeholder="Today I am grateful for..."
        />
      </section>

      {/* FOOTER */}

      <footer>
        <Flower2 size={22} />

        <h2>A well-designed life<br />
          is a work in progress.
        </h2>

        <p>
          You don't need to have it all figured out.
          Just keep designing.
        </p>

        <button className="reset-button" onClick={resetDashboard}>
          <RotateCcw size={14} />
          Reset dashboard
        </button>
      </footer>

    </div>
  );
}
