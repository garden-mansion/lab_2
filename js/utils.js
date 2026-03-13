export const getTransformAttribute = (name, ...values) => {
  return `${name}(${values.join(', ')})`
}

export const getTransformStyle = (...transformAttributes) => {
  return transformAttributes.map(attribute => getTransformAttribute(attribute.name, ...attribute.values)).join(', ')
}