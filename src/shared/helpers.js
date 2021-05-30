
import { values, not, __, prop, propEq, compose, match, filter, find, path, map, ifElse, trim, head, either, append, isNil,any, equals, length, converge, isEmpty} from 'ramda';
import { inputFieldLabels} from './const';


const isIDNotSelected = (state) => name => compose(not,find(propEq('identifier', name)),values,prop('userSearchFields'))(state);
const getNotSelectedOptions = (state) => compose(filter(compose(isIDNotSelected(state),prop('displayName'))), values)(inputFieldLabels);
const getOptionSelectedForIdField = index => compose(path(['userSearchFields',index,'identifier']));
const getFilteredIdOptions = selectedField => compose(filter(propEq('displayName', selectedField)), values)(inputFieldLabels);
const getSelectedOption = (index) => compose(head,getFilteredIdOptions,getOptionSelectedForIdField(index));
export const getIDFieldOptions = (state, index) => ifElse(getOptionSelectedForIdField(index), converge(append,[getSelectedOption(index), getNotSelectedOptions]), getNotSelectedOptions)(state);

export const isNilOrEmpty = either(isNil, isEmpty);
export const isNeitherNilNorEmpty = compose(not, isNilOrEmpty);

export const getPlaceholder = (state, index) => compose(prop('placeholder'),getSelectedOption(index))(state);

export const getSelectedOptionValue = (state, index) => compose(prop('displayName'), getSelectedOption(index))(state);

export const getIdFieldErrorMsg = (state, index) => {
    let error = '';
    if (isNilOrEmpty(state.userSearchFields[index])) {
        error = 'Please enter the fields';
    } else if (isNilOrEmpty(state.userSearchFields[index].identifier)) {
        error = 'Please enter a identifier field';
    } else if (isNilOrEmpty(state.userSearchFields[index].list)){
        error = 'Please enter a comma separated list';
    } else if (trim(state.userSearchFields[index].list) === ''){
        error = 'Please enter a list without spaces';
    } else if (state.userSearchFields[index].countryCode && compose(equals(0),length, filter(isNeitherNilNorEmpty), match(/^[0-9]*$/g))(state.userSearchFields[index].countryCode)){
        error = 'Please enter a valid country code';
    } else {
        error = null;
    }
    state.userSearchFields[index] = {...state.userSearchFields[index], error}
    return state.userSearchFields[index].error;
}
export const hasIdFieldErrors = compose(any(equals(true)),map(compose(isNeitherNilNorEmpty, prop('error'))), values, prop('userSearchFields'))
