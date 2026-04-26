import assert from "node:assert/strict";

import {
  education,
  experiences,
  navItems,
  profile,
  projects,
  skills,
} from "../app/portfolio-data.mjs";

assert.deepEqual(
  navItems.map((item) => item.label),
  ["About", "Education", "Experience", "Projects", "Skills"],
  "navigation should follow the approved resume-style section order",
);

assert.equal(education[0].school, "University of Toronto");
assert.equal(education[1].school, "Georgia Institute of Technology");
assert.equal(profile.resume, undefined, "resume should not be exposed in portfolio data");
assert.equal(profile.focus, "Full-stack applications, data pipelines, and ML systems");
assert.doesNotMatch(profile.summary, /transaction auditing/i);
assert.match(profile.summary, /tennis/i);
assert.match(profile.summary, /hunting for good coffee/i);

assert.equal(experiences[0].company, "Insight Pest Solutions");
assert.equal(experiences[0].role, "Software Engineer");
assert.match(experiences[0].bullets.join(" "), /500\+ users/);
assert.ok(
  experiences.some((item) => item.company === "World Wide Logistics Inc"),
  "World Wide Logistics experience should be included",
);

assert.equal(projects[0].name, "Scriptorium");
assert.ok(
  projects.some((item) => item.name === "Movie Match"),
  "older portfolio projects should be included",
);
assert.equal(skills[0].items[0], "Python");

console.log("portfolio data verified");
