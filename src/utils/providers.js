
export const provideButtonLoadingToggle = (btnId) => {

    return (isLoading) => {
        const loadingClass = "btn-loading";
        const buttonElement = document.getElementById(btnId);
        
        buttonElement.disabled = isLoading;
        if(isLoading) {
            buttonElement.classList.add(loadingClass);
            return;
        }

        buttonElement.classList.remove(loadingClass);
        return;
    }
}