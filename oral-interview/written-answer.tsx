type User = {
  id: number;
  name: string;
  role: "admin" | "user";
};

type AdminPanelProps = {
  user: User;
  onDelete: (id: number) => void;
};

function AdminPanel({ user, onDelete }: AdminPanelProps) {
  if (user.role !== "admin") {
    return <p>Access denied</p>;
  }

  return <button onClick={() => onDelete(user.id)}>Delete all users</button>;
}
