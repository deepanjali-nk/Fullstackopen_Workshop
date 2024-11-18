const Display = (props) => {
    return <h1 id="one"> Hello {props.message}</h1>
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
