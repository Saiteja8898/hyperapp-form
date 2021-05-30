import { h, text } from 'hyperapp';
import '../../styles/select.scss';

export default select = (props) => h('select', {
    class: 'custom-dropdown',
    name: props.index,
    id: props.index,
    key: props.index,
    onchange: (_, e) => [props.onOptionSelect, {index: props.index, value: e.target.value}],
    value: props.value
}, [
    ...props.options.map((option, j) => h('option', {
        value: option.displayName,
        key: j,
        disabled: j===0,
        defaultSelected: j===0,
        selected: props.value === option.displayName
    }, [
        option.icon && h('i', {
            class: "option-icon icon " + option.icon
        }), h('span', {
            class: "option-label"
        }, text(option.displayName))
    ]))
])