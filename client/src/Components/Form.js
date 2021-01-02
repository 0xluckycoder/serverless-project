import React from 'react'

export default function Form() {

    function handleChange(e) {
        e.preventDefault();
        console.log(e);
    }

    return (
        <div>
            <div class="mb-3">
                <label for="formFile" class="form-label">Default file input example</label>
                <input onChange={handleChange} class="form-control" type="file" id="formFile" />
            </div>
        </div>
    )
}