export default function Question({ question, options, onAnswer }) {
  retrun(
    <div>
      <h2>{question}</h2>
      {options.map(function (option) {
        return (
          <button
            key={option}
            onClick={function () {
              onAnswer(option);
            }}>
            {option}
          </button>
        );
      })}
    </div>
  );
}
