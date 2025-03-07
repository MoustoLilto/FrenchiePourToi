function utilsService() {
    const utilsServiceFactory = {
        useAfterDelay: (fn: () => void, delay: number) => {
            return new Promise((resolve) =>
                setTimeout(() => {
                    resolve(fn());
                }, delay)
            );
        },
    };

    return utilsServiceFactory;
}

export default utilsService();
