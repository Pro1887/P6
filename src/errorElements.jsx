import "./errorElements.css"

const CAccess = () => {
    return (
        <>
        <h1 className="blinking red">! Concurrent Access Detected !</h1>
        <p className="eHint">Disconnect from existing device to proceed</p>
        </>
    );
}

export default CAccess;