export default function TaskList() {
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <div>
      <section>
        <div className="box-container">
          <ul>{listItems}</ul>
        </div>
      </section>
    </div>
  )
}
