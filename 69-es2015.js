(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[69],{

/***/ "./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js ***!
  \**************************************************************/
/*! exports provided: ion_tab, ion_tabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_tab", function() { return Tab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_tabs", function() { return Tabs; });
/* harmony import */ var _core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core-13ed1ad7.js */ "./node_modules/@ionic/core/dist/esm/core-13ed1ad7.js");
/* harmony import */ var _config_bb99b659_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-bb99b659.js */ "./node_modules/@ionic/core/dist/esm/config-bb99b659.js");
/* harmony import */ var _framework_delegate_00265c49_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./framework-delegate-00265c49.js */ "./node_modules/@ionic/core/dist/esm/framework-delegate-00265c49.js");




const Tab = class {
    constructor(hostRef) {
        Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.loaded = false;
        /** @internal */
        this.active = false;
    }
    componentWillLoad() {
    }
    /** Set the active component for the tab */
    async setActive() {
        await this.prepareLazyLoaded();
        this.active = true;
    }
    async prepareLazyLoaded() {
        if (!this.loaded && this.component != null) {
            this.loaded = true;
            try {
                return Object(_framework_delegate_00265c49_js__WEBPACK_IMPORTED_MODULE_2__["a"])(this.delegate, this.el, this.component, ['ion-page']);
            }
            catch (e) {
                console.error(e);
            }
        }
        return undefined;
    }
    render() {
        const { tab, active, component } = this;
        return (Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["H"], { role: "tabpanel", "aria-hidden": !active ? 'true' : null, "aria-labelledby": `tab-button-${tab}`, class: {
                'ion-page': component === undefined,
                'tab-hidden': !active
            } }, Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
    }
    get el() { return Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this); }
    static get style() { return ":host(.tab-hidden){display:none!important}"; }
};

const Tabs = class {
    constructor(hostRef) {
        Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.transitioning = false;
        this.tabs = [];
        /** @internal */
        this.useRouter = false;
        this.onTabClicked = (ev) => {
            const { href, tab } = ev.detail;
            const selectedTab = this.tabs.find(t => t.tab === tab);
            if (this.useRouter && href !== undefined) {
                const router = document.querySelector('ion-router');
                if (router) {
                    router.push(href);
                }
            }
            else if (selectedTab) {
                this.select(selectedTab);
            }
        };
        this.ionNavWillLoad = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionNavWillLoad", 7);
        this.ionTabsWillChange = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionTabsWillChange", 3);
        this.ionTabsDidChange = Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this, "ionTabsDidChange", 3);
    }
    componentWillLoad() {
        if (!this.useRouter) {
            this.useRouter = !!document.querySelector('ion-router') && !this.el.closest('[no-router]');
        }
        this.tabs = Array.from(this.el.querySelectorAll('ion-tab'));
        this.initSelect().then(() => {
            this.ionNavWillLoad.emit();
            this.componentWillUpdate();
        });
    }
    componentDidUnload() {
        this.tabs.length = 0;
        this.selectedTab = this.leavingTab = undefined;
    }
    componentWillUpdate() {
        const tabBar = this.el.querySelector('ion-tab-bar');
        if (tabBar) {
            const tab = this.selectedTab ? this.selectedTab.tab : undefined;
            tabBar.selectedTab = tab;
        }
    }
    /**
     * Select a tab by the value of its `tab` property or an element reference.
     *
     * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
     */
    async select(tab) {
        const selectedTab = await this.getTab(tab);
        if (!this.shouldSwitch(selectedTab)) {
            return false;
        }
        await this.setActive(selectedTab);
        await this.notifyRouter();
        this.tabSwitch();
        return true;
    }
    /**
     * Get a specific tab by the value of its `tab` property or an element reference.
     *
     * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
     */
    async getTab(tab) {
        const tabEl = (typeof tab === 'string')
            ? this.tabs.find(t => t.tab === tab)
            : tab;
        if (!tabEl) {
            console.error(`tab with id: "${tabEl}" does not exist`);
        }
        return tabEl;
    }
    /**
     * Get the currently selected tab.
     */
    getSelected() {
        return Promise.resolve(this.selectedTab ? this.selectedTab.tab : undefined);
    }
    /** @internal */
    async setRouteId(id) {
        const selectedTab = await this.getTab(id);
        if (!this.shouldSwitch(selectedTab)) {
            return { changed: false, element: this.selectedTab };
        }
        await this.setActive(selectedTab);
        return {
            changed: true,
            element: this.selectedTab,
            markVisible: () => this.tabSwitch(),
        };
    }
    /** @internal */
    async getRouteId() {
        const tabId = this.selectedTab && this.selectedTab.tab;
        return tabId !== undefined ? { id: tabId, element: this.selectedTab } : undefined;
    }
    async initSelect() {
        if (this.useRouter) {
            return;
        }
        // wait for all tabs to be ready
        await Promise.all(this.tabs.map(tab => tab.componentOnReady()));
        await this.select(this.tabs[0]);
    }
    setActive(selectedTab) {
        if (this.transitioning) {
            return Promise.reject('transitioning already happening');
        }
        this.transitioning = true;
        this.leavingTab = this.selectedTab;
        this.selectedTab = selectedTab;
        this.ionTabsWillChange.emit({ tab: selectedTab.tab });
        return selectedTab.setActive();
    }
    tabSwitch() {
        const selectedTab = this.selectedTab;
        const leavingTab = this.leavingTab;
        this.leavingTab = undefined;
        this.transitioning = false;
        if (!selectedTab) {
            return;
        }
        if (leavingTab !== selectedTab) {
            if (leavingTab) {
                leavingTab.active = false;
            }
            this.ionTabsDidChange.emit({ tab: selectedTab.tab });
        }
    }
    notifyRouter() {
        if (this.useRouter) {
            const router = document.querySelector('ion-router');
            if (router) {
                return router.navChanged('forward');
            }
        }
        return Promise.resolve(false);
    }
    shouldSwitch(selectedTab) {
        const leavingTab = this.selectedTab;
        return selectedTab !== undefined && selectedTab !== leavingTab && !this.transitioning;
    }
    render() {
        return (Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["H"], { onIonTabButtonClick: this.onTabClicked }, Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "top" }), Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "tabs-inner" }, Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "bottom" })));
    }
    get el() { return Object(_core_13ed1ad7_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this); }
    static get style() { return ":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;z-index:0}.tabs-inner,:host{contain:layout size style}.tabs-inner{position:relative;-ms-flex:1;flex:1}"; }
};




/***/ })

}]);
//# sourceMappingURL=69-es2015.js.map