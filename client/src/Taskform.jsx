function Taskform({ title, onTitleChange, onAdd }) {
    function handleSubmit(event) {
        event.preventDefault();
        if (!title.trim()) return;

        onAdd();
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={function (event) { onTitleChange(event.target.value); }}
                placeholder="What needs to be done?"
                aria-label="Task title"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default Taskform;