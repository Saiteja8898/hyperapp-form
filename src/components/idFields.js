import { h , text } from 'hyperapp';
import { values } from 'ramda';
import select from '../shared/components/select';
import { inputFieldLabels } from '../shared/const';
import { getIdFieldErrorMsg, getPlaceholder, hasIdFieldErrors, getSelectedOptionValue } from '../shared/helpers';
import '../styles/idField.scss';
const OptionSelect = (state, {
    index,
    value
}) => {
    state.userSearchFields = {
        ...state.userSearchFields,
        [index]: {
            identifier: value
        }
    };
    return {
        ...state
    };
}

const AddRow = (state) => {
    state.searchFields.length < state.maxNoOfSearchFields ? state.searchFields.push(state.searchFields[state.searchFields.length - 1] + 1) : null;
    return {
        ...state
    };
}

const OnTextEntry = (state, {
    index,
    ...value
}) => {
    state.userSearchFields[index] = {
        ...state.userSearchFields[index],
        ...value
    };
    return {
        ...state
    };
}

const DeleteRow = (state, index) => {
    state.searchFields = state.searchFields.filter((x) => x !== index);
    delete state.userSearchFields[index];
    return {
        ...state
    };
}

const OnSearchResult = (state, event) => {
    // event.preventDefault();
    // event.stopPropagation();
    console.log('User Entries', Object.values(state.userSearchFields));
    alert('Search Success');
    return {
        ...state
    };
}

export default idFields = (props) => h('section', {
    class: "user-inputs-section"
}, [
    h('div', {
        class: 'search-label'
    }, text('Select and enter the ID you want to search')),
    h('form', {
        class: 'search-form'
    }, [
        h('div', {
            class: 'fields-container'
        }, [
            ...props.searchFields.map((index, i, arr) => h('div', {
                class: 'id-container'
            }, [
                select({
                    index,
                    value: !!props.userSearchFields[index] && props.userSearchFields[index].identifier ? props.userSearchFields[index].identifier : 'Select',
                    options: values(inputFieldLabels),
                    onOptionSelect: OptionSelect
                }),
                h('div', {
                    class: 'list-field'
                }, [
                    getSelectedOptionValue(props, index) === inputFieldLabels.phNos.displayName && h('textarea', {
                        type: 'number',
                        name: index,
                        placeholder: 'Country Code',
                        class: 'country-code',
                        value: !!props.userSearchFields[index] ? props.userSearchFields[index].countryCode : null,
                        disabled: !getSelectedOptionValue(props, index),
                        oninput: (_, e) => [OnTextEntry, {
                            index,
                            countryCode: e.target.value
                        }]
                    }),
                    h('div', {
                        class: 'id-list-container'
                    }, [h('i', {
                        class: 'search-icon icon search'
                    }, text('')), h('textarea', {
                        type: 'text',
                        name: index,
                        placeholder: getPlaceholder(props, index),
                        class: 'idField-text',
                        value: !!props.userSearchFields[index] ? props.userSearchFields[index].list : null,
                        disabled: !getSelectedOptionValue(props, index),
                        oninput: (_, e) => [OnTextEntry, {
                            index,
                            list: e.target.value
                        }]
                    })]),
                    arr.length > 1 && h('span', {
                        class: 'delete-icon icon delete',
                        onclick: [DeleteRow, index]
                    }, text('D'))
                ]),
                h('div', {
                    class: 'warning-msg'
                }, text(getIdFieldErrorMsg(props, index)))
            ]))
        ]),
        h('div', {
            class: {
                'add-field-btn': true, 'disabled-btn': props.maxNoOfSearchFields === props.searchFields.length || hasIdFieldErrors(props)
            },
            onclick: AddRow
        }, text('+ Add another ID type to search')),
        h('div', {
            class: {
                'search-btn custom-button': true, 'disabled-btn': hasIdFieldErrors(props)
            },
            onclick: OnSearchResult
        }, text('SEARCH'))
    ])
])