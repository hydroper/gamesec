/**
 * Path to a control. It consists of slash-delimited portions.
 * Portions are treated as follows:
 *
 * 1. If it is a `..` portion, it resolves to the parent.
 * 2. If it is a `.first` portion, it resolves to the first child.
 * 3. If it is a `.last` portion, it resolves to the last child.
 * 4. It resolves to a child whose `id == portion`.
 */
export type ControlPath = string;