import React, { useState } from "react";
import { Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { InputProps } from "./Input.types";
import {
  InputWrapper,
  StyledTextInput,
  PickerWrapper,
  SelectButton,
  SelectButtonText,
  OptionList,
  OptionItem,
  Subtitle,
} from "./Input.styles";

export function Input({
  type,
  value,
  label,
  onChange,
  placeholder,
  options = [],
  disabled = false,
}: InputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <InputWrapper>
      {type === "text" ? (
        <>
          <Subtitle>{label}</Subtitle>
          <StyledTextInput
            value={value}
            placeholder={placeholder}
            editable={!disabled}
            onChangeText={onChange}
          />
        </>
      ) : type === "select" ? (
        <PickerWrapper>
          <Subtitle>{label}</Subtitle>
          <SelectButton
            placeholder={placeholder}
            onPress={() => setShowOptions(!showOptions)}
            disabled={disabled}
          >
            <SelectButtonText>
              {value || placeholder || "Selecione"}
            </SelectButtonText>
          </SelectButton>

          {showOptions && (
            <OptionList>
              {options.map((option, index) => (
                <OptionItem
                  key={option}
                  isLast={index === options.length - 1}
                  onPress={() => {
                    onChange(option);
                    setShowOptions(false);
                  }}
                >
                  <Text>{option}</Text>
                </OptionItem>
              ))}
            </OptionList>
          )}
        </PickerWrapper>
      ) : (
        <>
          <Subtitle>{label}</Subtitle>
          <SelectButton
            label={label}
            onPress={() => setShowPicker(true)}
            disabled={disabled}
          >
            <SelectButtonText>
              {value ? new Date(value).toLocaleDateString() : placeholder}
            </SelectButtonText>
          </SelectButton>
          <DateTimePickerModal
            isVisible={showPicker}
            mode="date"
            onConfirm={(date) => {
              setShowPicker(false);
              onChange(date.toISOString());
            }}
            onCancel={() => setShowPicker(false)}
          />
        </>
      )}
    </InputWrapper>
  );
}
