interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return <button className="bg-blue-500 text-white p-2 rounded">{children}</button>;
}