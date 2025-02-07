import type { StoryObj, DecoratorFn, StoryFn } from '@storybook/react';

import { useEffect } from '@storybook/addons';

import { createWithClassesDecorator, PseudoClasses } from '../../../.storybook/utils';
import { Toggle } from '../src';

import './Toggle.stories.css';

const testingChromaticClassNames = [PseudoClasses.HOVER, PseudoClasses.FOCUS, PseudoClasses.ACTIVE];
const useModifiedClassLists: DecoratorFn = (story, context) => {
  // This a second decorator to add to work already done
  // with the above decorator
  useEffect(() => {
    // get the id's attached to each input element
    // they contains the pseudo class name that we attached above
    const inputElements = Array.from(document.getElementsByTagName('input'));
    inputElements.forEach((inputEl) => {
      const elementId = inputEl.getAttribute('id')?.trim();
      if (elementId && !inputEl.classList.contains(elementId)) {
        // add to its class list if its not there
        inputEl.classList.add(elementId);
      }
    });
  }, []);
  const { originalStoryFn, args, viewMode } = context;
  // Original typing is not entirely accurate.
  // It passes everything in the first arg as a prop
  // to the component which it not ideal
  const originalTemplate = originalStoryFn as StoryFn;
  if (viewMode === 'docs') {
    return story();
  }

  return (
    <div className="Toggle-storygroup-wrapper ">
      <span className="Toggle-state-label">Resting</span>
      {story()}
      {originalTemplate && (
        <>
          <span className="Toggle-state-label">Disabled</span>
          {originalTemplate({ ...args, disabled: true, id: 'disabled-toggle' }, context)}
        </>
      )}
    </div>
  );
};

export default {
  component: Toggle,
  title: 'Components/Toggle',
  description: 'Toggles represent on/off values as opposed to selection.',
  parameters: {
    status: {
      type: import.meta.env.PACKAGE_STATUS__TOGGLE,
    },
  },
  decorators: [
    createWithClassesDecorator(testingChromaticClassNames, (args, originalStory, context) => (
      <>
        <span className="Toggle-state-label">{`${
          args.className?.replace('pseudo-', '') || ''
        }`}</span>
        {originalStory({ ...args, id: args.className }, context)}
      </>
    )),
    useModifiedClassLists,
  ],
};

type Story = StoryObj<typeof Toggle>;

export const On: Story = { args: { checked: true } };

export const Off: Story = { args: { checked: false } };

export const WithoutOnText: Story = { args: { checked: true, toggleOnText: '' } };

export const WithoutOffText: Story = { args: { checked: false, toggleOffText: '' } };

export const AriaLabelledByExample = () => (
  <div className="Toggle-iggy-grid">
    <h3 id="Iggy">Activate Iggy</h3>
    <Toggle aria-labelledby="Iggy" checked />
  </div>
);
