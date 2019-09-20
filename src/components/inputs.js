import React from "react"

export const InputText = (
    {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors
    }
) => (
        < form onSubmit={handleSubmit} >
            <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
            />
            <button type="submit">Submit</button>
        </form >
    );

export const InputEmail = (
    {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors
    }
) => (
        < form onSubmit={handleSubmit} >
            <input
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="email"
            />
            <button type="submit">Submit</button>
        </form >
    );