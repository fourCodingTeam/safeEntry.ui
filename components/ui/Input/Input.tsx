import { theme } from "@/constants/theme";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  InputWrapper,
  OptionItem,
  OptionList,
  PickerWrapper,
  StyledSelectInput,
  StyledSelectInputText,
  StyledTextInput,
  Subtitle,
} from "./Input.styles";
import { InputProps } from "./Input.types";

export function Input({
  type,
  value,
  label,
  onChange,
  placeholder,
  options = [],
  disabled = false,
  isPassword,
  keyboardType,
  maxLength,
  name,
  openSelect,
  setOpenSelect,
}: InputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const isSelectOpen = openSelect === name;

  const selectedOptionLabel =
    options.find((option) => option.value === value)?.label ||
    placeholder ||
    "Selecione";

  return (
    <InputWrapper>
      {type === "text" ? (
        <>
          {label && <Subtitle>{label}</Subtitle>}
          <StyledTextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.placeholder}
            editable={!disabled}
            maxLength={maxLength}
            onChangeText={onChange}
            keyboardType={keyboardType === "N" ? "numeric" : "default"}
            secureTextEntry={isPassword}
            style={{
              color: value ? theme.colors.black : theme.colors.placeholder,
            }}
          />
        </>
      ) : type === "select" ? (
        <PickerWrapper>
          {label && <Subtitle>{label}</Subtitle>}
          <StyledSelectInput
            placeholder={placeholder}
            onPress={() =>
              setOpenSelect && setOpenSelect(isSelectOpen ? null : name ?? null)
            }
            disabled={disabled}
          >
            <StyledSelectInputText
              style={{
                color: value ? theme.colors.black : theme.colors.placeholder,
              }}
            >
              {selectedOptionLabel}
            </StyledSelectInputText>
            <Ionicons
              name={isSelectOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color={theme.colors.black60}
            />
          </StyledSelectInput>

          {isSelectOpen && (
            <OptionList>
              {options.map((option, index) => (
                <OptionItem
                  key={option.value}
                  isLast={index === options.length - 1}
                  onPress={() => {
                    onChange(option.value);
                    setOpenSelect && setOpenSelect(null);
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{option.label}</Text>
                </OptionItem>
              ))}
            </OptionList>
          )}
        </PickerWrapper>
      ) : (
        <>
          {label && <Subtitle>{label}</Subtitle>}
          <StyledSelectInput
            label={label}
            onPress={() => setShowPicker(true)}
            disabled={disabled}
          >
            <StyledSelectInputText
              style={{
                color: value ? theme.colors.black : theme.colors.placeholder,
              }}
            >
              {value instanceof Date ? formatDate(value) : placeholder}
            </StyledSelectInputText>
            <Ionicons
              name="calendar"
              size={18}
              color={theme.colors.placeholder}
            />
          </StyledSelectInput>
          <DateTimePickerModal
            isVisible={showPicker}
            mode="date"
            onConfirm={(date) => {
              setShowPicker(false);
              onChange(date);
            }}
            onCancel={() => setShowPicker(false)}
            minimumDate={new Date()}
            locale="pt-BR"
            positiveButton={{
              label: "Confirmar",
              textColor: theme.colors.blue,
            }}
            negativeButton={{ label: "Cancelar", textColor: theme.colors.red }}
          />
        </>
      )}
    </InputWrapper>
  );
}
