/**
 * Path to a display object. It consists of slash-delimited portions.
 * Portions are treated as follows:
 *
 * 1. If it is a `..` portion, it resolves to the parent.
 * 2. If it is a `.` portion, it resolves to the same object.
 * 3. If it is a `.first` portion, it resolves to the first child.
 * 4. If it is a `.last` portion, it resolves to the last child.
 * 5. If it is an empty portion, it resolves to the same object.
 * 6. It resolves to a child whose `id == portion`.
 */
export type DisplayPath = string;