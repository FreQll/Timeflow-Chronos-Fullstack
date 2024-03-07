import ReduxToastrLib from "react-redux-toastr"

const ReduxToastProvider = () => {
    
    return (
        <ReduxToastrLib
            newestOnTop={false}
            preventDuplicates
            progressBar
            closeOnToastrClick
            timeOut={4000}
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
        ></ReduxToastrLib>
    )
}

export default ReduxToastProvider