import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlValueAccessor } from '@angular/forms';
import * as ɵngcc0 from '@angular/core';
export declare class AutocompleteComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
    private renderer;
    searchInput: ElementRef;
    filteredListElement: ElementRef;
    historyListElement: ElementRef;
    inputKeyUp$: Observable<any>;
    inputKeyDown$: Observable<any>;
    query: string;
    filteredList: any[];
    historyList: any[];
    isHistoryListVisible: boolean;
    elementRef: any;
    selectedIdx: number;
    toHighlight: string;
    notFound: boolean;
    isFocused: boolean;
    isOpen: boolean;
    isScrollToEnd: boolean;
    overlay: boolean;
    private manualOpen;
    private manualClose;
    /**
     * Data of items list.
     * It can be array of strings or array of objects.
     */
    data: any[];
    searchKeyword: string;
    placeholder: string;
    heading: string;
    initialValue: any;
    /**
     * History identifier of history list
     * When valid history identifier is given, then component stores selected item to local storage of user's browser.
     * If it is null then history is hidden.
     * History list is visible if at least one history item is stored.
     */
    historyIdentifier: string;
    /**
     * Heading text of history list.
     * If it is null then history heading is hidden.
     */
    historyHeading: string;
    historyListMaxNumber: number;
    notFoundText: string;
    isLoading: boolean;
    debounceTime: number;
    disabled: boolean;
    /**
     * The minimum number of characters the user must type before a search is performed.
     */
    minQueryLength: number;
    /**
     * Focus first item in the list
     */
    focusFirst: boolean;
    /**
     * Custom filter function
     */
    customFilter: (items: any[], query: string) => any[];
    /** Event that is emitted whenever an item from the list is selected. */
    selected: EventEmitter<any>;
    /** Event that is emitted whenever an input is changed. */
    inputChanged: EventEmitter<any>;
    /** Event that is emitted whenever an input is focused. */
    readonly inputFocused: EventEmitter<void>;
    /** Event that is emitted whenever an input is cleared. */
    readonly inputCleared: EventEmitter<void>;
    /** Event that is emitted when the autocomplete panel is opened. */
    readonly opened: EventEmitter<void>;
    /** Event that is emitted when the autocomplete panel is closed. */
    readonly closed: EventEmitter<void>;
    /** Event that is emitted when scrolled to the end of items. */
    readonly scrolledToEnd: EventEmitter<void>;
    itemTemplate: TemplateRef<any>;
    notFoundTemplate: TemplateRef<any>;
    customTemplate: TemplateRef<any>;
    /**
     * Propagates new value when model changes
     */
    propagateChange: any;
    onTouched: any;
    /**
     * Writes a new value from the form model into the view,
     * Updates model
     */
    writeValue(value?: any): void;
    /**
     * Registers a handler that is called when something in the view has changed
     */
    registerOnChange(fn: any): void;
    /**
     * Registers a handler specifically for when a control receives a touch event
     */
    registerOnTouched(fn: () => void): void;
    /**
     * Event that is called when the value of an input element is changed
     */
    onChange(event: any): void;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    /**
     * Event that is called when the control status changes to or from DISABLED
     */
    setDisabledState(isDisabled: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Set initial value
     * @param value
     */
    setInitialValue(value: any): void;
    /**
     * Update search results
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Items change
     */
    handleItemsChange(): void;
    /**
     * Filter data
     */
    filterList(): void;
    /**
     * Default filter function, used unless customFilter is provided
     */
    defaultFilterFunction(): any[];
    /**
     * Check if item is a string in the list.
     * @param item
     */
    isTypeString(item: any): boolean;
    /**
     * Select item in the list.
     * @param item
     */
    select(item: any): void;
    /**
     * Document click
     * @param e event
     */
    handleClick(e: any): void;
    /**
     * Handle body overlay
     */
    handleOverlay(): void;
    /**
     * Scroll items
     */
    handleScroll(): void;
    /**
     * Define panel state
     */
    setPanelState(event: any): void;
    /**
     * Manual controls
     */
    open(): void;
    close(): void;
    focus(): void;
    clear(): void;
    /**
     * Remove search query
     */
    remove(e: any): void;
    /**
     * Initialize historyList search
     */
    initSearchHistory(): void;
    handleOpen(): void;
    handleClose(): void;
    handleFocus(e: any): void;
    scrollToEnd(): void;
    /**
     * Initialize keyboard events
     */
    initEventStream(): void;
    /**
     * Listen keyboard events
     */
    listenEventStream(): void;
    /**
     * on keyup == when input changed
     * @param e event
     */
    onKeyUp(e: any): void;
    /**
     * Keyboard arrow top and arrow bottom
     * @param e event
     */
    onFocusItem(e: any): void;
    /**
     * Scroll to focused item
     * * @param index
     */
    scrollToFocusedItem(index: any): void;
    /**
     * Select item on enter click
     */
    onHandleEnter(): void;
    /**
     * Esc click
     */
    onEsc(): void;
    /**
     * Tab click
     */
    onTab(): void;
    /**
     * Delete click
     */
    onDelete(): void;
    /**
     * Select item to save in localStorage
     * @param selected
     */
    saveHistory(selected: any): void;
    /**
     * Save item in localStorage
     * @param selected
     */
    saveHistoryToLocalStorage(selected: any): void;
    /**
     * Remove item from localStorage
     * @param index
     * @param e event
     */
    removeHistoryItem(index: any, e: any): void;
    /**
     * Reset localStorage
     * @param e event
     */
    resetHistoryList(e: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<AutocompleteComponent>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<AutocompleteComponent, "ng-autocomplete", never, {
    "data": "data";
    "placeholder": "placeholder";
    "heading": "heading";
    "historyHeading": "historyHeading";
    "historyListMaxNumber": "historyListMaxNumber";
    "notFoundText": "notFoundText";
    "minQueryLength": "minQueryLength";
    "focusFirst": "focusFirst";
    "disabled": "disabled";
    "searchKeyword": "searchKeyword";
    "initialValue": "initialValue";
    "historyIdentifier": "historyIdentifier";
    "isLoading": "isLoading";
    "debounceTime": "debounceTime";
    "customFilter": "customFilter";
    "itemTemplate": "itemTemplate";
    "notFoundTemplate": "notFoundTemplate";
}, {
    "selected": "selected";
    "inputChanged": "inputChanged";
    "inputFocused": "inputFocused";
    "inputCleared": "inputCleared";
    "opened": "opened";
    "closed": "closed";
    "scrolledToEnd": "scrolledToEnd";
}, ["customTemplate"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJhdXRvY29tcGxldGUuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3T0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25Jbml0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgcHJpdmF0ZSByZW5kZXJlcjtcbiAgICBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjtcbiAgICBmaWx0ZXJlZExpc3RFbGVtZW50OiBFbGVtZW50UmVmO1xuICAgIGhpc3RvcnlMaXN0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgICBpbnB1dEtleVVwJDogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIGlucHV0S2V5RG93biQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBxdWVyeTogc3RyaW5nO1xuICAgIGZpbHRlcmVkTGlzdDogYW55W107XG4gICAgaGlzdG9yeUxpc3Q6IGFueVtdO1xuICAgIGlzSGlzdG9yeUxpc3RWaXNpYmxlOiBib29sZWFuO1xuICAgIGVsZW1lbnRSZWY6IGFueTtcbiAgICBzZWxlY3RlZElkeDogbnVtYmVyO1xuICAgIHRvSGlnaGxpZ2h0OiBzdHJpbmc7XG4gICAgbm90Rm91bmQ6IGJvb2xlYW47XG4gICAgaXNGb2N1c2VkOiBib29sZWFuO1xuICAgIGlzT3BlbjogYm9vbGVhbjtcbiAgICBpc1Njcm9sbFRvRW5kOiBib29sZWFuO1xuICAgIG92ZXJsYXk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBtYW51YWxPcGVuO1xuICAgIHByaXZhdGUgbWFudWFsQ2xvc2U7XG4gICAgLyoqXG4gICAgICogRGF0YSBvZiBpdGVtcyBsaXN0LlxuICAgICAqIEl0IGNhbiBiZSBhcnJheSBvZiBzdHJpbmdzIG9yIGFycmF5IG9mIG9iamVjdHMuXG4gICAgICovXG4gICAgZGF0YTogYW55W107XG4gICAgc2VhcmNoS2V5d29yZDogc3RyaW5nO1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgaGVhZGluZzogc3RyaW5nO1xuICAgIGluaXRpYWxWYWx1ZTogYW55O1xuICAgIC8qKlxuICAgICAqIEhpc3RvcnkgaWRlbnRpZmllciBvZiBoaXN0b3J5IGxpc3RcbiAgICAgKiBXaGVuIHZhbGlkIGhpc3RvcnkgaWRlbnRpZmllciBpcyBnaXZlbiwgdGhlbiBjb21wb25lbnQgc3RvcmVzIHNlbGVjdGVkIGl0ZW0gdG8gbG9jYWwgc3RvcmFnZSBvZiB1c2VyJ3MgYnJvd3Nlci5cbiAgICAgKiBJZiBpdCBpcyBudWxsIHRoZW4gaGlzdG9yeSBpcyBoaWRkZW4uXG4gICAgICogSGlzdG9yeSBsaXN0IGlzIHZpc2libGUgaWYgYXQgbGVhc3Qgb25lIGhpc3RvcnkgaXRlbSBpcyBzdG9yZWQuXG4gICAgICovXG4gICAgaGlzdG9yeUlkZW50aWZpZXI6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBIZWFkaW5nIHRleHQgb2YgaGlzdG9yeSBsaXN0LlxuICAgICAqIElmIGl0IGlzIG51bGwgdGhlbiBoaXN0b3J5IGhlYWRpbmcgaXMgaGlkZGVuLlxuICAgICAqL1xuICAgIGhpc3RvcnlIZWFkaW5nOiBzdHJpbmc7XG4gICAgaGlzdG9yeUxpc3RNYXhOdW1iZXI6IG51bWJlcjtcbiAgICBub3RGb3VuZFRleHQ6IHN0cmluZztcbiAgICBpc0xvYWRpbmc6IGJvb2xlYW47XG4gICAgZGVib3VuY2VUaW1lOiBudW1iZXI7XG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIG1pbmltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhlIHVzZXIgbXVzdCB0eXBlIGJlZm9yZSBhIHNlYXJjaCBpcyBwZXJmb3JtZWQuXG4gICAgICovXG4gICAgbWluUXVlcnlMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBGb2N1cyBmaXJzdCBpdGVtIGluIHRoZSBsaXN0XG4gICAgICovXG4gICAgZm9jdXNGaXJzdDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDdXN0b20gZmlsdGVyIGZ1bmN0aW9uXG4gICAgICovXG4gICAgY3VzdG9tRmlsdGVyOiAoaXRlbXM6IGFueVtdLCBxdWVyeTogc3RyaW5nKSA9PiBhbnlbXTtcbiAgICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW5ldmVyIGFuIGl0ZW0gZnJvbSB0aGUgbGlzdCBpcyBzZWxlY3RlZC4gKi9cbiAgICBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPGFueT47XG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpbnB1dCBpcyBjaGFuZ2VkLiAqL1xuICAgIGlucHV0Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT47XG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuZXZlciBhbiBpbnB1dCBpcyBmb2N1c2VkLiAqL1xuICAgIHJlYWRvbmx5IGlucHV0Rm9jdXNlZDogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbmV2ZXIgYW4gaW5wdXQgaXMgY2xlYXJlZC4gKi9cbiAgICByZWFkb25seSBpbnB1dENsZWFyZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIGF1dG9jb21wbGV0ZSBwYW5lbCBpcyBvcGVuZWQuICovXG4gICAgcmVhZG9ubHkgb3BlbmVkOiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gICAgLyoqIEV2ZW50IHRoYXQgaXMgZW1pdHRlZCB3aGVuIHRoZSBhdXRvY29tcGxldGUgcGFuZWwgaXMgY2xvc2VkLiAqL1xuICAgIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICAgIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiBzY3JvbGxlZCB0byB0aGUgZW5kIG9mIGl0ZW1zLiAqL1xuICAgIHJlYWRvbmx5IHNjcm9sbGVkVG9FbmQ6IEV2ZW50RW1pdHRlcjx2b2lkPjtcbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgbm90Rm91bmRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBjdXN0b21UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAvKipcbiAgICAgKiBQcm9wYWdhdGVzIG5ldyB2YWx1ZSB3aGVuIG1vZGVsIGNoYW5nZXNcbiAgICAgKi9cbiAgICBwcm9wYWdhdGVDaGFuZ2U6IGFueTtcbiAgICBvblRvdWNoZWQ6IGFueTtcbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBuZXcgdmFsdWUgZnJvbSB0aGUgZm9ybSBtb2RlbCBpbnRvIHRoZSB2aWV3LFxuICAgICAqIFVwZGF0ZXMgbW9kZWxcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlPzogYW55KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHRoYXQgaXMgY2FsbGVkIHdoZW4gc29tZXRoaW5nIGluIHRoZSB2aWV3IGhhcyBjaGFuZ2VkXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBoYW5kbGVyIHNwZWNpZmljYWxseSBmb3Igd2hlbiBhIGNvbnRyb2wgcmVjZWl2ZXMgYSB0b3VjaCBldmVudFxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSB2YWx1ZSBvZiBhbiBpbnB1dCBlbGVtZW50IGlzIGNoYW5nZWRcbiAgICAgKi9cbiAgICBvbkNoYW5nZShldmVudDogYW55KTogdm9pZDtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKTtcbiAgICAvKipcbiAgICAgKiBFdmVudCB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIHN0YXR1cyBjaGFuZ2VzIHRvIG9yIGZyb20gRElTQUJMRURcbiAgICAgKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkO1xuICAgIG5nT25Jbml0KCk6IHZvaWQ7XG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU2V0IGluaXRpYWwgdmFsdWVcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJbml0aWFsVmFsdWUodmFsdWU6IGFueSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHNlYXJjaCByZXN1bHRzXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogSXRlbXMgY2hhbmdlXG4gICAgICovXG4gICAgaGFuZGxlSXRlbXNDaGFuZ2UoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBGaWx0ZXIgZGF0YVxuICAgICAqL1xuICAgIGZpbHRlckxpc3QoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGZpbHRlciBmdW5jdGlvbiwgdXNlZCB1bmxlc3MgY3VzdG9tRmlsdGVyIGlzIHByb3ZpZGVkXG4gICAgICovXG4gICAgZGVmYXVsdEZpbHRlckZ1bmN0aW9uKCk6IGFueVtdO1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0ZW0gaXMgYSBzdHJpbmcgaW4gdGhlIGxpc3QuXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKi9cbiAgICBpc1R5cGVTdHJpbmcoaXRlbTogYW55KTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZWxlY3QgaXRlbSBpbiB0aGUgbGlzdC5cbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqL1xuICAgIHNlbGVjdChpdGVtOiBhbnkpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIERvY3VtZW50IGNsaWNrXG4gICAgICogQHBhcmFtIGUgZXZlbnRcbiAgICAgKi9cbiAgICBoYW5kbGVDbGljayhlOiBhbnkpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEhhbmRsZSBib2R5IG92ZXJsYXlcbiAgICAgKi9cbiAgICBoYW5kbGVPdmVybGF5KCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU2Nyb2xsIGl0ZW1zXG4gICAgICovXG4gICAgaGFuZGxlU2Nyb2xsKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lIHBhbmVsIHN0YXRlXG4gICAgICovXG4gICAgc2V0UGFuZWxTdGF0ZShldmVudDogYW55KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBNYW51YWwgY29udHJvbHNcbiAgICAgKi9cbiAgICBvcGVuKCk6IHZvaWQ7XG4gICAgY2xvc2UoKTogdm9pZDtcbiAgICBmb2N1cygpOiB2b2lkO1xuICAgIGNsZWFyKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHNlYXJjaCBxdWVyeVxuICAgICAqL1xuICAgIHJlbW92ZShlOiBhbnkpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgaGlzdG9yeUxpc3Qgc2VhcmNoXG4gICAgICovXG4gICAgaW5pdFNlYXJjaEhpc3RvcnkoKTogdm9pZDtcbiAgICBoYW5kbGVPcGVuKCk6IHZvaWQ7XG4gICAgaGFuZGxlQ2xvc2UoKTogdm9pZDtcbiAgICBoYW5kbGVGb2N1cyhlOiBhbnkpOiB2b2lkO1xuICAgIHNjcm9sbFRvRW5kKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBrZXlib2FyZCBldmVudHNcbiAgICAgKi9cbiAgICBpbml0RXZlbnRTdHJlYW0oKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4ga2V5Ym9hcmQgZXZlbnRzXG4gICAgICovXG4gICAgbGlzdGVuRXZlbnRTdHJlYW0oKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBvbiBrZXl1cCA9PSB3aGVuIGlucHV0IGNoYW5nZWRcbiAgICAgKiBAcGFyYW0gZSBldmVudFxuICAgICAqL1xuICAgIG9uS2V5VXAoZTogYW55KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBLZXlib2FyZCBhcnJvdyB0b3AgYW5kIGFycm93IGJvdHRvbVxuICAgICAqIEBwYXJhbSBlIGV2ZW50XG4gICAgICovXG4gICAgb25Gb2N1c0l0ZW0oZTogYW55KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBTY3JvbGwgdG8gZm9jdXNlZCBpdGVtXG4gICAgICogKiBAcGFyYW0gaW5kZXhcbiAgICAgKi9cbiAgICBzY3JvbGxUb0ZvY3VzZWRJdGVtKGluZGV4OiBhbnkpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCBpdGVtIG9uIGVudGVyIGNsaWNrXG4gICAgICovXG4gICAgb25IYW5kbGVFbnRlcigpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEVzYyBjbGlja1xuICAgICAqL1xuICAgIG9uRXNjKCk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogVGFiIGNsaWNrXG4gICAgICovXG4gICAgb25UYWIoKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBEZWxldGUgY2xpY2tcbiAgICAgKi9cbiAgICBvbkRlbGV0ZSgpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCBpdGVtIHRvIHNhdmUgaW4gbG9jYWxTdG9yYWdlXG4gICAgICogQHBhcmFtIHNlbGVjdGVkXG4gICAgICovXG4gICAgc2F2ZUhpc3Rvcnkoc2VsZWN0ZWQ6IGFueSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogU2F2ZSBpdGVtIGluIGxvY2FsU3RvcmFnZVxuICAgICAqIEBwYXJhbSBzZWxlY3RlZFxuICAgICAqL1xuICAgIHNhdmVIaXN0b3J5VG9Mb2NhbFN0b3JhZ2Uoc2VsZWN0ZWQ6IGFueSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGl0ZW0gZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcGFyYW0gZSBldmVudFxuICAgICAqL1xuICAgIHJlbW92ZUhpc3RvcnlJdGVtKGluZGV4OiBhbnksIGU6IGFueSk6IHZvaWQ7XG4gICAgLyoqXG4gICAgICogUmVzZXQgbG9jYWxTdG9yYWdlXG4gICAgICogQHBhcmFtIGUgZXZlbnRcbiAgICAgKi9cbiAgICByZXNldEhpc3RvcnlMaXN0KGU6IGFueSk6IHZvaWQ7XG59XG4iXX0=