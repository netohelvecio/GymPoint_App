import React, { useRef, useEffect } from 'react';
import Select from 'react-select/async';
import propsTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

function customStyle(additionalStyle) {
  return {
    control: provided => ({
      ...provided,
      height: 36,
      fontSize: '15px',
      cursor: 'pointer',
      margin: '3px',
      ...additionalStyle,
    }),
    input: provided => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      height: 30,
    }),
  };
}

export default function AsyncSelect({
  name,
  label,
  loadOptions,
  multiple,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Select
        name={fieldName}
        loadOptions={loadOptions}
        isMulti={multiple}
        ref={ref}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
        defaultOptions
        noOptionsMessage={() => 'Nenhum aluno encontrado'}
        loadingMessage={() => 'Carregando...'}
        styles={customStyle()}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}

AsyncSelect.propTypes = {
  name: propsTypes.string.isRequired,
  loadOptions: propsTypes.func.isRequired,
  label: propsTypes.string,
  multiple: propsTypes.bool,
};

AsyncSelect.defaultProps = {
  multiple: false,
  label: '',
};
