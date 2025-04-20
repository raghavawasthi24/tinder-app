export const Refresh = () => {
    const refreshPage = () => {
        window.location.reload();
    }
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-black">
            <p>No more product to show!</p>
            <button className="border rounded-2xl px-2" onClick={refreshPage}>Refresh</button>
        </div>
    );
};
