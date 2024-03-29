package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("full_name").NotEmpty(),
		field.Enum("gender").Values("male", "female"),
		field.String("email_id").NotEmpty().Unique(),
		field.String("mobile_number").NotEmpty().MinLen(10).MaxLen(10),
		field.String("password_hash").NotEmpty(),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("contacts", Contact.Type),
	}
}
