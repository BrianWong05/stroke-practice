# Tasks: Add Guideline Arrows

- [x] **Define Arrow Marker** <!-- id: 0 -->
    - [x] Update `StrokeGuideline/index.tsx` to include `<defs>` and `<marker>`.
- [x] **Apply Marker to Paths** <!-- id: 1 -->
    - [x] Add `markerEnd` attribute to the guideline paths.
- [x] **Verify** <!-- id: 2 -->
    - [x] Check visual appearance on multiple characters.
    - [x] Tuned arrow size based on user feedback (made smaller).
    - [x] **Fix Interference**:
        - [x] Attempted white mask (reverted due to opacity issue).
        - [x] Adjusted `refX` to replace line end cleanly.
