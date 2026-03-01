export default function EmptyRow({ colSpan = 4, message = 'Aucun élément.' }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-2 py-3 text-center text-xs text-brand-muted"
      >
        {message}
      </td>
    </tr>
  );
}
