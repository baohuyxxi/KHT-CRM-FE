export default function Toast({ message, type }) {
    return (
        <div
            className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white text-sm z-[9999] transition-all
                            ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
            {message}
        </div>
    );
}
