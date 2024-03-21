export const enumEventTypes = {
  ARRANGEMENT: {
    title: "Arrangement",
    color: "#e59090",
  },
  REMINDER: {
    title: "Reminder",
    color: "#7d8cd6",
  },
  TASK: {
    title: "Tasks",
    color: "#B74CC8",
  },
  BIRTHDAY: {
    title: "Birthdays",
    color: "#E6AA36",
  },
};

export const enumEventTypesArray = Object.entries(enumEventTypes).map(
  ([key, value]) => ({
    key,
    ...value,
  })
);
