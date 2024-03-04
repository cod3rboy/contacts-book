package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
)

type Address struct {
	Street        string
	Area          string
	City          string
	ProvinceState string
	Country       string
	PinCode       string
}

// Contact holds the schema definition for the Contact entity.
type Contact struct {
	ent.Schema
}

// Fields of the Contact.
func (Contact) Fields() []ent.Field {
	return []ent.Field{
		field.String("first_name").NotEmpty(),
		field.String("last_name").Optional(),
		field.Enum("gender").Values("male", "female"),
		field.String("email").Optional(),
		field.String("mobile_number").NotEmpty().MinLen(10).MaxLen(10),
		field.JSON("address", &Address{}).Optional(),
	}
}

// Edges of the Contact.
func (Contact) Edges() []ent.Edge {
	return nil
}
