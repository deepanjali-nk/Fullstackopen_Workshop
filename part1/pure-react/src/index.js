const Display = (props) => {
    return React.createElement("h1", { id: "one" }, props.message);
};

const App = () => {
    return React.createElement("div", {}, [
        React.createElement(Display, { message: "I am first" }),
        React.createElement(Display, { message: "I am second" }),
        React.createElement(Display, { message: "I am third" }),
    ]);
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
