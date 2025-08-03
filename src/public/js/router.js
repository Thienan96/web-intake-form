export class Router {
    constructor(routes) {
        this.routes = routes;
        // console.log('Available routes:', Object.keys(this.routes));
        this.handleRoute();
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
    }

    parseRoute(path) {
        // console.log('Parsing route for path:', path);
        // Extract query parameters
        const url = new URL(window.location.href);
        const queryParams = Object.fromEntries(url.searchParams.entries()) || {};
        // console.log('Extracted query params:', queryParams);
        // Convert route patterns like '/step-1/:formId/:stepId' to regex
        const routes = Object.keys(this.routes).map(route => {
            // Escape forward slashes and convert route parameters to regex groups
            if (!route || route === '*') {
                console.warn('Empty route detected, skipping:', route);
                return null// Skip empty routes
            }
            const pattern = route
                .replace(/\//g, '\\/') // Escape forward slashes
                .replace(/:(\w+)/g, '([^/]+)');
            const regex = new RegExp(`^${pattern}$`);
            // console.log('Route pattern:', route, 'Regex:', regex);
            return { regex, route };
        }).filter(Boolean); // Remove null entries

        // Find matching route
        for (const { regex, route } of routes) {
            const match = path.match(regex);
            if (match) {
                // console.log('Found matching route:', route);
                // Extract parameter values
                const params = {};
                const paramNames = route.match(/:(\w+)/g) || [];
                paramNames.forEach((param, index) => {
                    params[param.slice(1)] = match[index + 1];
                });
                // console.log('Extracted params:', params);
                return { component: this.routes[route], params, queryParams };
            }
        }

        // If no route matches, check if there's a base route without parameters
        const basePath = path.split('/')[1];
        const baseRoute = `/${basePath}`;
        // console.log('Trying base route:', baseRoute);
        if (this.routes[baseRoute]) {
            return { component: this.routes[baseRoute], params: {}, queryParams };
        }
        // console.log('No match found, returning home route');
        return { component: null, params: {}, queryParams };
    }

    handleRoute() {
        const path = window.location.pathname;
        // console.log('Handling route:', path);
        
        const { component, params, queryParams } = this.parseRoute(path);
        
        if (component) {
            const root = document.getElementById('app');
            if (!root) {
                console.error('Root element #app not found!');
                return;
            }
            
            try {
                root.innerHTML = component();
                if (typeof component.init === 'function') {
                    component.init(params, queryParams);
                }
            } catch (error) {
                console.error('Error rendering component:', error);
            }
        } else {
            this.navigate('/');
            console.error('No matching route found for:', path);
        }
    }

    navigate(path) {
        // console.log('Navigating to:', path);
        window.history.pushState({}, '', path);
        this.handleRoute();
        window.scrollTo(0, 0);
    }
}
